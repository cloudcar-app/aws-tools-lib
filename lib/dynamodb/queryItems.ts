import { DynamoDB } from 'aws-sdk';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';
import { QueryDynamoParams } from './types';
import { documentClient } from './utils/dynamoClient';

export const queryItems = async (
  params: QueryDynamoParams,
): Promise<DynamoDB.DocumentClient.QueryOutput> => {
  const { TableName } = params;

  if (TableName === undefined) {
    throw new CloudcarError({
      message: MessageError.queryItems.messages.tableName,
      name: MessageError.queryItems.name,
    });
  }

  const result = await documentClient
    .query(params as DynamoDB.QueryInput)
    .promise();

  return result;
};
