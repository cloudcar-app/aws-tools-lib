/* eslint-disable no-await-in-loop */
import { DynamoDB, Response } from 'aws-sdk';
import { TransactionWriteDynamoParams } from './types';
import { documentClient } from './utils/dynamoClient';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';

const addErrorToResponse = <D, E>(response: Response<D, E>) => {
  const cancellationReasons = JSON.parse(response.httpResponse.body.toString())
    .CancellationReasons;
  response.error[cancellationReasons] = cancellationReasons;
};

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

  const currentBatchToDelete: DynamoDB.TransactWriteItemsInput = {
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

    currentBatchToDelete.TransactItems.push(
      itemToDelete as DynamoDB.TransactWriteItem,
    );

    if (currentBatchToDelete.TransactItems.length % 25 === 0) {
      const request = documentClient.transactWrite(currentBatchToDelete);
      request.on('extractError', (response) => {
        if (response.error) {
          addErrorToResponse(response);
        }
      });
      await request.promise();
      currentBatchToDelete.TransactItems.length = 0;
    }
  }

  if (currentBatchToDelete.TransactItems.length > 0) {
    const request = documentClient.transactWrite(currentBatchToDelete);
    request.on('extractError', (response) => {
      if (response.error) {
        addErrorToResponse(response);
      }
    });
    await request.promise();
  }
};
