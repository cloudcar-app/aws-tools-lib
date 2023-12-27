/* eslint-disable no-await-in-loop */
import {
  TransactWriteItem,
  TransactWriteItemsInput,
} from '@aws-sdk/client-dynamodb';
import { TransactionWriteDynamoParams } from './types';
import { documentClient } from './utils/dynamoClient';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';
import generateUpdateQuery from './utils/generate-update-query';

export const updateItems = async (params: TransactionWriteDynamoParams) => {
  const { TransactItems, TableName, ConditionExpression } = params;

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

  const currentBatchToUpdate: TransactWriteItemsInput = {
    TransactItems: [],
  };

  if (currentBatchToUpdate.TransactItems) {
    // eslint-disable-next-line no-restricted-syntax
    for (const transactItem of TransactItems) {
      const itemToUpdate = { ...transactItem };
      const { item, ...updateParams } = itemToUpdate.Update!;
      itemToUpdate.Update = {
        ...updateParams,
        TableName,
      };

      if (item) {
        const expression = generateUpdateQuery(item);
        itemToUpdate.Update = {
          ...itemToUpdate.Update,
          ...expression,
        };
      }

      if (ConditionExpression) {
        itemToUpdate.Update.ConditionExpression = ConditionExpression;
      }

      currentBatchToUpdate.TransactItems.push(
        itemToUpdate as TransactWriteItem,
      );

      if (currentBatchToUpdate.TransactItems.length % 25 === 0) {
        const request = await documentClient.transactWrite(
          currentBatchToUpdate,
        );
        if (request.$metadata.httpStatusCode !== 200) {
          throw new Error('Error updating items');
        }
        currentBatchToUpdate.TransactItems.length = 0;
      }
    }

    if (currentBatchToUpdate.TransactItems.length > 0) {
      const request = await documentClient.transactWrite(currentBatchToUpdate);
      if (request.$metadata.httpStatusCode !== 200) {
        throw new Error('Error updating items');
      }
    }
  }
};
