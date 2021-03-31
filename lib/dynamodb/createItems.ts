/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
import { DateTime } from 'luxon';
import { DynamoDB } from 'aws-sdk';
import * as _ from 'lodash';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';
import { BatchWriteDynamoParams } from './types';
import generateExactScanExpresion from './utils/generate-exact-scan-expression';
import { documentClient } from './utils/dynamoClient';

/**
 * returns true if the batch write has any unprocessed element. otherwise it returns false
 */
const areUnprocessedItems = (result: DynamoDB.BatchWriteItemOutput) => {
  if (
    result.UnprocessedItems &&
    Object.keys(result.UnprocessedItems).length > 0
  ) {
    return true;
  }
  return false;
};

/**
 * writes a batch of item to dynamo. The function returns a list of items that were not processed by the batch write, otherwise it retuns an empty list.
 */
const batchWrite = async (
  tablename: string,
  batchToWrite: DynamoDB.WriteRequest[],
) => {
  const result = await documentClient
    .batchWrite({
      RequestItems: {
        [tablename]: batchToWrite,
      },
    })
    .promise();
  if (areUnprocessedItems(result) && result.UnprocessedItems !== undefined) {
    return result.UnprocessedItems[tablename].map(
      (request) =>
        request.PutRequest?.Item as { [key: string]: string | number },
    );
  }
  return [];
};

/**
 * scan the rows to see if any have the same key as any of the keys of the objects to write. returns a list with the objects that will not be written because they have the same key as some value in the list.
 */
const getItemsWithSameKeyValue = async (
  itemsToWrite: { [key: string]: string | number }[],
  tableKey: string,
  tableName: string,
) => {
  const keyAttributesToFilter = {};
  itemsToWrite.forEach((item, index) => {
    keyAttributesToFilter[index] = item.vin;
  });

  let expression = {};

  if (!_.isEmpty(keyAttributesToFilter)) {
    expression = generateExactScanExpresion(keyAttributesToFilter, tableKey);
  }

  const parsedParams = {
    TableName: tableName,
    ...expression,
  };

  const scanResult = await documentClient
    .scan(parsedParams as DynamoDB.ScanInput)
    .promise();

  const unprocessedItems =
    scanResult.Items !== undefined ? scanResult.Items : [];

  return unprocessedItems;
};

/**
 * receives a list of items to write to dynamo. The writes are grouped by lists of length 25. In case the original list of elements is not a multiple of 25, an independent writing is done outside of the original loop. The function returns an object with the elements that were not processed by the batch write
 */
export const createItems = async (params: BatchWriteDynamoParams) => {
  const { itemsToWrite, tableName, tableKey } = params;
  if (itemsToWrite === undefined) {
    throw new CloudcarError({
      name: MessageError.createItems.name,
      message: MessageError.createItems.messages.itemsToWrite,
    });
  }
  if (tableName === undefined) {
    throw new CloudcarError({
      name: MessageError.createItems.name,
      message: MessageError.createItems.messages.tableName,
    });
  }
  if (tableKey === undefined) {
    throw new CloudcarError({
      name: MessageError.createItems.name,
      message: MessageError.createItems.messages.tableKey,
    });
  }

  const itemsWithSameKeys = await getItemsWithSameKeyValue(
    itemsToWrite,
    tableKey,
    tableName,
  );
  const unprocessedKeys = itemsWithSameKeys.map((item) => item[tableKey]);

  const filteredItems = itemsToWrite.filter((item) => {
    if (unprocessedKeys.includes(item[tableKey])) {
      return false;
    }
    return true;
  });

  const filteredItemsStringified = filteredItems.map((item) =>
    JSON.stringify(item),
  );

  const unprocessedItems = itemsToWrite.filter(
    (item) => !filteredItemsStringified.includes(JSON.stringify(item)),
  );
  const currentBatchToWrite: DynamoDB.WriteRequest[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const itemToWrite of filteredItems) {
    const item = {
      PutRequest: {
        Item: {
          ...itemToWrite,
          createdAt: DateTime.local().toString(),
        },
      },
    };

    currentBatchToWrite.push(item as DynamoDB.WriteRequest);

    if (currentBatchToWrite.length % 25) {
      const result = await batchWrite(tableName, currentBatchToWrite);
      if (Object.keys(result).length > 0) unprocessedItems.push(...result);
      currentBatchToWrite.length = 0;
    }
  }

  if (currentBatchToWrite.length > 0) {
    const result = await batchWrite(tableName, currentBatchToWrite);
    if (Object.keys(result).length > 0) unprocessedItems.push(...result);
  }

  return unprocessedItems;
};
