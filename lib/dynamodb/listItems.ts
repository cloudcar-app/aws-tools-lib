import * as _ from 'lodash';
import { DynamoDB } from 'aws-sdk';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';
import {
  ScanDynamoParams,
  ConditionExpressionParams,
  ValidOperators,
} from './types';
import generateScanExpression from './utils/generate-scan-expression';
import { documentClient } from './utils/dynamoClient';
import generateConditionExpression from './utils/generate-condition-expression';

export const listItems = async (
  params: ScanDynamoParams,
): Promise<Object[]> => {
  const { TableName, Attributes, RequiredAttributes } = params;

  if (TableName === undefined) {
    throw new CloudcarError({
      message: MessageError.listItems.messages.tableName,
      name: MessageError.listItems.name,
    });
  }

  let optionalAttributesExpression: ConditionExpressionParams;
  let requiredAttributesExpression: ConditionExpressionParams;
  let filterExpression: ConditionExpressionParams = {};

  if (
    !_.isEmpty(Attributes) &&
    RequiredAttributes &&
    !_.isEmpty(RequiredAttributes)
  ) {
    optionalAttributesExpression = generateScanExpression(
      Attributes,
      ValidOperators.contains,
      ValidOperators.or,
    );
    requiredAttributesExpression = generateScanExpression(
      RequiredAttributes,
      ValidOperators.equals,
      ValidOperators.and,
    );
    const conditionExpressionParams = {
      operator: ValidOperators.and,
      expressionArguments: [
        requiredAttributesExpression.FilterExpression,
        optionalAttributesExpression.FilterExpression,
      ],
    };
    filterExpression = {
      FilterExpression: generateConditionExpression(conditionExpressionParams),
      ExpressionAttributeNames: {
        ...requiredAttributesExpression.ExpressionAttributeNames,
        ...optionalAttributesExpression.ExpressionAttributeNames,
      },
      ExpressionAttributeValues: {
        ...requiredAttributesExpression.ExpressionAttributeValues,
        ...optionalAttributesExpression.ExpressionAttributeValues,
      },
    };
  } else if (!_.isEmpty(Attributes) && !RequiredAttributes) {
    optionalAttributesExpression = generateScanExpression(
      Attributes,
      ValidOperators.contains,
      ValidOperators.or,
    );
  } else if (RequiredAttributes && !_.isEmpty(RequiredAttributes)) {
    requiredAttributesExpression = generateScanExpression(
      RequiredAttributes,
      ValidOperators.equals,
      ValidOperators.and,
    );
    filterExpression = requiredAttributesExpression;
  }

  const parsedParams = {
    TableName,
    ...filterExpression,
  };

  const result = await documentClient
    .scan(parsedParams as DynamoDB.ScanInput)
    .promise();

  if (result.Items !== undefined) {
    return result.Items;
  }

  return [];
};
