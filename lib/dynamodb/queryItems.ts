import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';
import { QueryDynamoParams } from './types';
import { documentClient } from './utils/dynamoClient';
import { QueryInput, QueryOutput } from '@aws-sdk/client-dynamodb';

export const queryItems = async (
  params: QueryDynamoParams,
): Promise<QueryOutput> => {
  const { TableName } = params;

  if (TableName === undefined) {
    throw new CloudcarError({
      message: MessageError.queryItems.messages.tableName,
      name: MessageError.queryItems.name,
    });
  }

  const result = await documentClient
    .query(params as QueryInput)

  return result;
};
