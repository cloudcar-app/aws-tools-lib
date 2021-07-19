/* eslint-disable no-await-in-loop */
import { DynamoDB, Response } from 'aws-sdk';
import { TransactionWriteDynamoParams } from './types';
import { documentClient } from './utils/dynamoClient';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';
import generateUpdateQuery from './utils/generate-update-query';

const addErrorToResponse = <D, E>(response: Response<D, E>) => {
  const cancellationReasons = JSON.parse(response.httpResponse.body.toString())
    .CancellationReasons;
  response.error[cancellationReasons] = cancellationReasons;
};

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

  const currentBatchToUpdate: DynamoDB.TransactWriteItemsInput = {
    TransactItems: [],
  };

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
      itemToUpdate as DynamoDB.TransactWriteItem,
    );

    if (currentBatchToUpdate.TransactItems.length % 25 === 0) {
      const request = documentClient.transactWrite(currentBatchToUpdate);
      request.on('extractError', (response) => {
        if (response.error) {
          addErrorToResponse(response);
        }
      });
      await request.promise();
      currentBatchToUpdate.TransactItems.length = 0;
    }
  }

  if (currentBatchToUpdate.TransactItems.length > 0) {
    const request = documentClient.transactWrite(currentBatchToUpdate);
    request.on('extractError', (response) => {
      if (response.error) {
        addErrorToResponse(response);
      }
    });
    await request.promise();
  }
};
