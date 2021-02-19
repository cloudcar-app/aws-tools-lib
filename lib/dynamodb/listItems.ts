import * as _ from 'lodash';
import { DynamoDB } from 'aws-sdk';
import CloudcarError from '../errors/index';
import MessageError from '../message.errors';
import { ScanDynamoParams } from './types';
import generateScanExpression from './utils/generate-scan-expression';

const dynamo = process.env.LOCAL
  ? new DynamoDB({ region: 'localhost', endpoint: 'http://localhost:8000' })
  : new DynamoDB({ region: process.env.REGION || 'us-east-1' });

const documentClient = new DynamoDB.DocumentClient({ service: dynamo });

export const listItems = async (
  params: ScanDynamoParams,
): Promise<Object[]> => {
  const { TableName, Attributes } = params;

  if (TableName === undefined) {
    throw new CloudcarError({
      message: MessageError.listItems.messages.tableName,
      name: MessageError.listItems.name,
    });
  }

  let expression = {};

  if (!_.isEmpty(Attributes)) {
    expression = generateScanExpression(Attributes);
  }

  const parsedParams = {
    TableName,
    ...expression,
  };

  const result = await documentClient
    .scan(parsedParams as DynamoDB.ScanInput)
    .promise();

  if (result.Items !== undefined) {
    return result.Items;
  }

  return [];
};
