/* eslint-disable no-await-in-loop */
import { BatchUpdateDynamoParams } from './types';
import { documentClient } from './utils/dynamoClient';

export const batchUpdate = async (params: BatchUpdateDynamoParams) => {
  const { TransactItems } = params;

  const currentBatchToUpdate: any = {
    TransactItems: [],
  };

  // eslint-disable-next-line no-restricted-syntax
  for (const itemToUpdate of TransactItems) {
    currentBatchToUpdate.TransactItems.push(itemToUpdate);

    if (currentBatchToUpdate.TransactItems.length % 25 === 0) {
      await documentClient.transactWrite(currentBatchToUpdate).promise();
      currentBatchToUpdate.TransactItems.length = 0;
    }
  }

  if (currentBatchToUpdate.TransactItems.length > 0) {
    await documentClient.transactWrite(currentBatchToUpdate).promise();
  }
};
