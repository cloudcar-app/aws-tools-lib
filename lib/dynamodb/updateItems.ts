/* eslint-disable no-await-in-loop */
import { DynamoDB } from 'aws-sdk';
import { TransactionWriteDynamoParams } from './types';
import { documentClient } from './utils/dynamoClient';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';

export const updateItems = async (params: TransactionWriteDynamoParams) => {
  const { TransactItems, TableName, ConditionExpression } = params;

  if (!ConditionExpression) {
    throw new CloudcarError({
      message: MessageError.updateItems.messages.conditionExpression,
      name: MessageError.updateItems.name,
    });
  }

  if (!TableName) {
    throw new CloudcarError({
      message: MessageError.updateItems.messages.tableName,
      name: MessageError.updateItems.name,
    });
  }

  TransactItems.forEach((items) => {
    if (!items.Update) {
      throw new CloudcarError({
        message: MessageError.updateItems.messages.update,
        name: MessageError.updateItems.name,
      });
    }
  });

  const currentBatchToUpdate: DynamoDB.TransactWriteItemsInput = {
    TransactItems: [],
  };

  // eslint-disable-next-line no-restricted-syntax
  for (const itemToUpdate of TransactItems) {
    itemToUpdate.Update!.TableName = TableName;
    itemToUpdate.Update!.ConditionExpression = ConditionExpression;
    currentBatchToUpdate.TransactItems.push(
      itemToUpdate as DynamoDB.TransactWriteItem,
    );

    if (currentBatchToUpdate.TransactItems.length % 25 === 0) {
      await documentClient.transactWrite(currentBatchToUpdate).promise();
      currentBatchToUpdate.TransactItems.length = 0;
    }
  }

  if (currentBatchToUpdate.TransactItems.length > 0) {
    await documentClient.transactWrite(currentBatchToUpdate).promise();
  }
};
