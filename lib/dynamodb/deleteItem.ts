import { DeleteItemCommandInput } from '@aws-sdk/client-dynamodb';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';
import { DeleteDynamoParams } from './types';
import { documentClient } from './utils/dynamoClient';

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

  const result = await documentClient.delete(params as DeleteItemCommandInput);

  return result;
};
