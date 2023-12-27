/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
import { DateTime } from 'luxon';
import { BatchWriteItemOutput, WriteRequest } from '@aws-sdk/client-dynamodb';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';
import { BatchWriteDynamoParams } from './types';
import { documentClient } from './utils/dynamoClient';

/**
 * returns true if the batch write has any unprocessed element. otherwise it returns false
 */
const areUnprocessedItems = (result: BatchWriteItemOutput) => {
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
const batchWrite = async (tablename: string, batchToWrite: WriteRequest[]) => {
  const result = await documentClient.batchWrite({
    RequestItems: {
      [tablename]: batchToWrite,
    },
  });
  if (areUnprocessedItems(result) && result.UnprocessedItems !== undefined) {
    return result.UnprocessedItems[tablename].map(
      (request) =>
        request.PutRequest?.Item as {
          [key: string]: string | number | boolean;
        },
    );
  }
  return [];
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

  const unprocessedItems: WriteRequest[] = [];
  const currentBatchToWrite: WriteRequest[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const itemToWrite of itemsToWrite) {
    const item = {
      PutRequest: {
        Item: {
          ...itemToWrite,
          createdAt: DateTime.local().toString(),
        },
      },
    };

    currentBatchToWrite.push(item as WriteRequest);

    if (currentBatchToWrite.length % 25 === 0) {
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
