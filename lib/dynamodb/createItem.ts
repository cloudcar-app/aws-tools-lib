import { DateTime } from 'luxon';
import { PutCommandInput } from '@aws-sdk/lib-dynamodb';
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
    ...Item,
    createdAt: DateTime.local().toString(),
  };

  await documentClient.put(params as PutCommandInput);

  return params.Item;
};
