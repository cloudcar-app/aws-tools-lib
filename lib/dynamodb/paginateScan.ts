import { ScanInput } from '@aws-sdk/client-dynamodb';
import { documentClient } from './utils/dynamoClient';

export const paginateScan = async <T>({
  params,
  pageSize,
  acc = [],
}: {
  params: ScanInput;
  pageSize: number;
  acc?: T[];
}): Promise<{ page: T[]; hasNextPage: boolean }> => {
  const remaining = pageSize - acc.length;

  const result = await documentClient.scan(params);

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
    return paginateScan({
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
