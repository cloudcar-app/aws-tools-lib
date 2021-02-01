import { define } from 'cooky-cutter';
import { DateTime } from 'luxon';

import {
  ScanDynamoParams,
  UpdateDynamoParams,
  QueryDynamoParams,
  PutDynamoParams,
} from '../../lib/dynamodb/types';

export const ScanDynamoParamsFactory = define<ScanDynamoParams>({
  TableName: 'TableName',
  Attributes: (i: number) => {
    return { Name: `Bob #${i}` };
  },
});

export const UpdateDynamoParamsFactory = define<UpdateDynamoParams>({
  TableName: 'some- tableName',
  Key: (i: number) => {
    return { Key: i };
  },
  Item: (i: number) => {
    return { Value: i };
  },
});

export const QueryParamsFactory = define<QueryDynamoParams>({
  TableName: 'some-tableName',
  ConditionExpression: 'some-expression',
});

export const PutDynamoParamsFactory = define<PutDynamoParams>({
  TableName: 'some-table-name',
  Item: (i: number) => {
    return {
      Name: `Bob #${i}`,
      createdAt: DateTime.local().setZone('America/Santiago').toString(),
    };
  },
  ConditionExpression: 'some-condition-expression',
});
