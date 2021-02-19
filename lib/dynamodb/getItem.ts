import { DynamoDB } from 'aws-sdk';
import CloudcarError from '../errors/index';
import MessageError from '../message.errors';
import { QueryDynamoParams } from './types';

const dynamo = process.env.LOCAL
  ? new DynamoDB({ region: 'localhost', endpoint: 'http://localhost:8000' })
  : new DynamoDB({ region: process.env.REGION || 'us-east-1' });

const documentClient = new DynamoDB.DocumentClient({ service: dynamo });

export const getItem = async (
  params: QueryDynamoParams,
): Promise<Object | null> => {
  const { TableName } = params;
  if (TableName === undefined) {
    throw new CloudcarError({
      message: MessageError.getItem.messages.tableName,
      name: MessageError.getItem.name,
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

  if (result.Items === undefined) {
    throw new CloudcarError({
      message: MessageError.getItem.messages.undefinedResult,
      name: MessageError.getItem.name,
    });
  } else if (result.Items.length === 0) {
    return null;
  }

  return result.Items[0];
};
