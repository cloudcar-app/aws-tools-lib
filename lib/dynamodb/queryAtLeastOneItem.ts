import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';
import { QueryDynamoParams } from './types';
import { documentClient } from './utils/dynamoClient';
import { QueryInput } from '@aws-sdk/client-dynamodb';

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
    .query(params as QueryInput)

  if (result.Items === undefined || result.Items.length === 0) {
    throw new CloudcarError({
      message: MessageError.queryAtLeastOneItem.messages.notFoundItem,
      name: MessageError.queryAtLeastOneItem.name,
    });
  }
  return result.Items;
};
