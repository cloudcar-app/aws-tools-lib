import { QueryCommandOutput } from '@aws-sdk/lib-dynamodb';
import { QueryCommandInput } from '@aws-sdk/client-dynamodb';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';
import { QueryDynamoParams } from './types';
import { documentClient } from './utils/dynamoClient';

export const queryItems = async (
  params: QueryDynamoParams,
): Promise<QueryCommandOutput> => {
  const { TableName } = params;

  if (TableName === undefined) {
    throw new CloudcarError({
      message: MessageError.queryItems.messages.tableName,
      name: MessageError.queryItems.name,
    });
  }

  const result = await documentClient.query(params as QueryCommandInput);

  return result;
};
