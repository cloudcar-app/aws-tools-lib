/* eslint-disable no-await-in-loop */
import {
  TransactWriteItem,
  TransactWriteItemsCommandInput,
} from '@aws-sdk/client-dynamodb';
import { TransactionWriteDynamoParams } from './types';
import { documentClient } from './utils/dynamoClient';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';

export const deleteItems = async (params: TransactionWriteDynamoParams) => {
  const { TransactItems, TableName, ConditionExpression } = params;

  if (!TableName) {
    throw new CloudcarError({
      message: MessageError.deleteItems.messages.tableName,
      name: MessageError.deleteItems.name,
    });
  }

  TransactItems.forEach((items) => {
    if (!items.Delete) {
      throw new CloudcarError({
        message: MessageError.deleteItems.messages.delete,
        name: MessageError.deleteItems.name,
      });
    }
  });

  const currentBatchToDelete: TransactWriteItemsCommandInput = {
    TransactItems: [],
  };

  // eslint-disable-next-line no-restricted-syntax
  for (const transactItem of TransactItems) {
    const itemToDelete = { ...transactItem };
    itemToDelete.Delete = {
      ...itemToDelete.Delete,
      TableName,
    };

    if (ConditionExpression) {
      itemToDelete.Delete.ConditionExpression = ConditionExpression;
    }

    currentBatchToDelete.TransactItems?.push(itemToDelete as TransactWriteItem);

    if (
      currentBatchToDelete.TransactItems &&
      currentBatchToDelete.TransactItems.length % 25 === 0
    ) {
      await documentClient.transactWrite(currentBatchToDelete);
      currentBatchToDelete.TransactItems.length = 0;
    }
  }

  if (
    currentBatchToDelete.TransactItems &&
    currentBatchToDelete.TransactItems.length > 0
  ) {
    await documentClient.transactWrite(currentBatchToDelete);
  }
};
