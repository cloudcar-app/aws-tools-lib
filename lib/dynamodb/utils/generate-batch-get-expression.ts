import { BatchGetDynamoParams } from '../types';

export const generateBatchGetItemExpression = (
  params: BatchGetDynamoParams,
) => {
  const {
    tableName,
    keys,
    projectionExpression,
    ReturnConsumedCapacity,
  } = params;

  return {
    RequestItems: {
      [tableName]: {
        Keys: keys,
        ProjectionExpression: projectionExpression,
      },
    },
    ReturnConsumedCapacity,
  };
};
