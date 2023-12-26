import { DateTime } from 'luxon';
import { PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';
import { PutDynamoParams } from './types';
import { documentClient } from './utils/dynamoClient';

export const createItem = async (params: PutDynamoParams): Promise<Object> => {
  const { TableName } = params;
  const { Item } = params;

  if (TableName === undefined) {
    throw new CloudcarError({
      name: MessageError.createItem.name,
      message: MessageError.createItem.messages.tableName,
    });
  }

  if (Item === undefined) {
    throw new CloudcarError({
      name: MessageError.createItem.name,
      message: MessageError.createItem.messages.item,
    });
  }

  // eslint-disable-next-line no-param-reassign
  params.Item = {
    createdAt: DateTime.local().toString(),
    ...Item,
  };

  await documentClient.put(params as PutItemCommandInput);

  return params.Item;
};
