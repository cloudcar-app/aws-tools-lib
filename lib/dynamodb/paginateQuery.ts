import { QueryCommandInput } from '@aws-sdk/lib-dynamodb';

import { documentClient } from './utils/dynamoClient';

export const paginateQuery = async <T>({
  params,
  pageSize,
  acc = [],
}: {
  params: QueryCommandInput;
  pageSize: number;
  acc?: T[];
}): Promise<{ page: T[]; hasNextPage: boolean }> => {
  const remaining = pageSize - acc.length;
  const result = await documentClient.query(params);
  const newItems = result.Items || [];
  const newAcc = [...acc, ...(newItems.slice(0, remaining) as T[])];

  const notMoreItemsToQuery: boolean = !result.LastEvaluatedKey;

  if (notMoreItemsToQuery) {
    return {
      page: newAcc,
      hasNextPage: newItems.length > remaining,
    };
  }

  const requestedPageSizeNotFilled: boolean = newAcc.length < pageSize;
  const checkIfExistOneMorePage: boolean = newItems.length <= remaining;

  if (requestedPageSizeNotFilled || checkIfExistOneMorePage) {
    return paginateQuery({
      params: {
        ...params,
        ExclusiveStartKey: result.LastEvaluatedKey,
      },
      pageSize,
      acc: newAcc,
    });
  }

  return {
    page: newAcc,
    hasNextPage: true,
  };
};
