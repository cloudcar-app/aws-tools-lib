import { define } from 'cooky-cutter';
import { DateTime } from 'luxon';

import {
  ScanDynamoParams,
  UpdateDynamoParams,
  QueryDynamoParams,
  PutDynamoParams,
  DeleteDynamoParams,
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
export const DeleteDynamoParamsFactory = define<DeleteDynamoParams>({
  TableName: 'some-table-name',
  Key: (i: number) => {
    return {
      primaryKey: `primary-key-#${i}`,
      secondaryKey: `secondary-key-#${i}`,
    };
  },
  ReturnValues: 'NONE',
  ConditionExpression: 'some-condition-expression',
});
