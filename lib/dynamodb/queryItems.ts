import { DynamoDB } from 'aws-sdk';
import CloudcarError from '../errors/index';
import MessageError from '../message.errors';
import { QueryDynamoParams } from './types';

const documentClient = process.env.LOCAL
  ? new DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000',
    })
  : new DynamoDB.DocumentClient();

export const queryAtLeastOneItem = async (
  params: QueryDynamoParams,
): Promise<Object[]> => {
  const { TableName } = params;

  if (TableName === undefined) {
    throw new CloudcarError({
      message: MessageError.queryAtLeastOneItem.messages.tableName,
      name: MessageError.queryAtLeastOneItem.name,
    });
  }

  const result = await documentClient
    .query(params as DynamoDB.QueryInput)
    .promise();

  if (result.Items === undefined || result.Items.length === 0) {
    throw new CloudcarError({
      message: MessageError.queryAtLeastOneItem.messages.notFoundItem,
      name: MessageError.queryAtLeastOneItem.name,
    });
  }
  return result.Items;
};
