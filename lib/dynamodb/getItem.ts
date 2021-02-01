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

export const getItem = async (params: QueryDynamoParams): Promise<Object> => {
  const { TableName } = params;
  if (TableName === undefined) {
    throw new CloudcarError({
      message: MessageError.queryAtLeastOneItem.messages.tableName,
      name: MessageError.queryAtLeastOneItem.name,
    });
  }
  // eslint-disable-next-line no-param-reassign
  params = {
    ...params,
    Limit: 1,
  };

  const result = await documentClient
    .query(params as DynamoDB.QueryInput)
    .promise();

  if (result.Items === undefined || result.Items.length === 0) {
    if (result.Items === undefined) {
      throw new CloudcarError({
        message: MessageError.queryAtLeastOneItem.messages.notFoundItem,
        name: MessageError.queryAtLeastOneItem.name,
      });
    }
    return {};
  }
  return result.Items[0];
};
