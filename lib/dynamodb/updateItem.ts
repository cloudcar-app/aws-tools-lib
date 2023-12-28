/* eslint-disable import/prefer-default-export */
import { UpdateItemInput } from '@aws-sdk/client-dynamodb';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';
import { UpdateDynamoParams } from './types';
import generateUpdateQuery from './utils/generate-update-query';
import { documentClient } from './utils/dynamoClient';

export const updateItem = async (
  params: UpdateDynamoParams,
): Promise<Object> => {
  const { TableName, Item, Key, ConditionExpression } = params;

  const expression = generateUpdateQuery(Item);

  if (TableName === undefined) {
    throw new CloudcarError({
      name: MessageError.updateItem.name,
      message: MessageError.updateItem.messages.tableName,
    });
  }

  if (Key === undefined) {
    throw new CloudcarError({
      name: MessageError.updateItem.name,
      message: MessageError.updateItem.messages.key,
    });
  }

  const parsedParams = {
    ConditionExpression,
    TableName,
    Key,
    ...expression,
    ReturnValues: 'ALL_NEW',
  };

  const { Attributes } = await documentClient.update(
    parsedParams as UpdateItemInput,
  );

  if (!Attributes) {
    throw new CloudcarError({
      name: MessageError.updateItem.name,
      message: MessageError.updateItem.messages.attributes,
    });
  }

  return Attributes;
};
