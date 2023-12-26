import { BatchGetCommandOutput } from '@aws-sdk/lib-dynamodb';
import { BatchGetItemCommandInput } from '@aws-sdk/client-dynamodb';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';
import { BatchGetDynamoParams } from './types';
import { documentClient } from './utils/dynamoClient';
import { generateBatchGetItemExpression } from './utils/generate-batch-get-expression';

export const batchGetItems = async (
  params: BatchGetDynamoParams,
): Promise<BatchGetCommandOutput> => {
  const { tableName, keys } = params;

  if (tableName === undefined) {
    throw new CloudcarError({
      message: MessageError.batchGet.messages.tableName,
      name: MessageError.batchGet.name,
    });
  }
  if (keys === undefined) {
    throw new CloudcarError({
      message: MessageError.batchGet.messages.keys,
      name: MessageError.batchGet.name,
    });
  }

  const result = await documentClient.batchGet(
    generateBatchGetItemExpression(params) as BatchGetItemCommandInput,
  );

  return result;
};
