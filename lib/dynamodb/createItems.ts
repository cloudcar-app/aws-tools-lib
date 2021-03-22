import { DateTime } from 'luxon';
import { DynamoDB } from 'aws-sdk';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';
import { BatchWriteDynamoParams } from './types';
import { documentClient } from './utils/dynamoClient';

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

  const itemsToWrite = RequestItems[tableName];
  itemsToWrite.forEach((request, index) => {
    const item = {
      PutRequest: {
        Item: {
          ...(request.PutRequest?.Item as {}),
          createdAt: DateTime.local().toString(),
        },
      },
    };
    itemsToWrite[index] = item as {};
  });

  let quotient = Math.floor(itemsToWrite.length / 25);
  const remainder = itemsToWrite.length % 25;

  let batchMultiplier = 1;
  let result;
  while (quotient > 0) {
    for (let i = 0; i < itemsToWrite.length - 1; i += 25) {
      // eslint-disable-next-line no-await-in-loop
      result = await documentClient
        .batchWrite({
          RequestItems: {
            [tableName]: itemsToWrite.slice(i, 25 * batchMultiplier),
          },
        } as DynamoDB.BatchWriteItemInput)
        .promise();
      batchMultiplier += 1;
      quotient -= 1;
    }
  }

  if (remainder > 0) {
    result = await documentClient
      .batchWrite({
        RequestItems: {
          [tableName]: itemsToWrite.slice(itemsToWrite.length - remainder),
        },
      } as DynamoDB.BatchWriteItemInput)
      .promise();
  }
  return result.UnprocessedItems;
};
