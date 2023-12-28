import { QueryInput } from '@aws-sdk/client-dynamodb';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';
import { QueryDynamoParams } from './types';

import { documentClient } from './utils/dynamoClient';

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

  const result = await documentClient.query(params as QueryInput);

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
