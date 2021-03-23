/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
import { DateTime } from 'luxon';
import { DynamoDB } from 'aws-sdk';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';
import { BatchWriteDynamoParams } from './types';
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
 * writes a batch of item to dynamo. The function returns an object with the elements that were not processed by the batch write, otherwise it retuns an empty object.
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
  if (areUnprocessedItems(result)) {
    return result.UnprocessedItems;
  }
  return {};
};

/**
 * receives a list of items to write to dynamo. The writes are grouped by lists of length 25. In case the original list of elements is not a multiple of 25, an independent writing is done outside of the original loop. The function returns an object with the elements that were not processed by the batch write
 */
export const createItems = async (
  params: BatchWriteDynamoParams,
  tableName: string,
) => {
  const { RequestItems } = params;

  if (RequestItems === undefined) {
    throw new CloudcarError({
      name: MessageError.createItems.name,
      message: MessageError.createItems.messages.requestItems,
    });
  }

  if (tableName === undefined) {
    throw new CloudcarError({
      name: MessageError.createItem.name,
      message: MessageError.createItem.messages.tableName,
    });
  }

  let itemCount = 0;
  const itemsToWrite = RequestItems[tableName];
  const currentBatchToWrite: DynamoDB.WriteRequest[] = [];
  let unprocessedItems: DynamoDB.BatchWriteItemRequestMap = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const itemToWrite of itemsToWrite) {
    itemCount += 1;
    const item = {
      PutRequest: {
        Item: {
          ...(itemToWrite.PutRequest?.Item as {}),
          createdAt: DateTime.local().toString(),
        },
      },
    };

    currentBatchToWrite.push(item as DynamoDB.WriteRequest);
    if (itemCount % 25 === 0) {
      const writeResult = await batchWrite(tableName, currentBatchToWrite);
      unprocessedItems = {
        ...unprocessedItems,
        ...writeResult,
      };
      currentBatchToWrite.length = 0;
    }
  }

  if (currentBatchToWrite.length > 0) {
    const writeResult = await batchWrite(tableName, currentBatchToWrite);
    unprocessedItems = {
      ...unprocessedItems,
      ...writeResult,
    };
  }

  return unprocessedItems;
};
