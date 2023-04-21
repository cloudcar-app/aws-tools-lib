import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';
import { DeleteDynamoParams } from './types';
import { documentClient } from './utils/dynamoClient';
import { DeleteCommandInput } from '@aws-sdk/lib-dynamodb';

export const deleteItem = async (
  params: DeleteDynamoParams,
): Promise<Object> => {
  const { TableName, Key } = params;

  if (TableName === undefined) {
    throw new CloudcarError({
      name: MessageError.deleteItem.name,
      message: MessageError.deleteItem.messages.tableName,
    });
  }

  if (Key === undefined) {
    throw new CloudcarError({
      name: MessageError.deleteItem.name,
      message: MessageError.deleteItem.messages.key,
    });
  }

  const result = await documentClient
    .delete(params as DeleteCommandInput)

  return result;
};
