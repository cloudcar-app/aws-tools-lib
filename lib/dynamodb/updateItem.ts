/* eslint-disable import/prefer-default-export */
import { DynamoDB } from 'aws-sdk';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';
import { UpdateDynamoParams } from './types';
import generateUpdateQuery from './utils/generate-update-query';
import { documentClient } from './utils/dynamoClient';

export const updateItem = async (
  params: UpdateDynamoParams,
): Promise<Object> => {
  const { TableName, Item, Key } = params;

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
    TableName,
    Key,
    ...expression,
    ReturnValues: 'ALL_NEW',
  };

  const { Attributes } = await documentClient
    .update(parsedParams as DynamoDB.UpdateItemInput)
    .promise();

  if (!Attributes) {
    throw new CloudcarError({
      name: MessageError.updateItem.name,
      message: MessageError.updateItem.messages.attributes,
    });
  }

  return Attributes;
};
