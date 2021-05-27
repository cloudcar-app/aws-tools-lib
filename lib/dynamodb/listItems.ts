import * as _ from 'lodash';
import { DynamoDB } from 'aws-sdk';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';
import { ScanDynamoParams, ConditionExpressionParams } from './types';
import generateScanExpression from './utils/generate-scan-expression';
import { documentClient } from './utils/dynamoClient';
import generateConditionExpression, {
  ValidOperators,
} from './utils/generate-condition-expression';

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

  let expression: ConditionExpressionParams;
  let requiredAttributesExpression: ConditionExpressionParams;
  let filterExpression: ConditionExpressionParams = {};

  if (
    !_.isEmpty(Attributes) &&
    RequiredAttributes &&
    !_.isEmpty(RequiredAttributes)
  ) {
    expression = generateScanExpression(
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
      leftArgument: requiredAttributesExpression.FilterExpression,
      rightArgument: expression.FilterExpression,
    };
    filterExpression = {
      FilterExpression: generateConditionExpression(conditionExpressionParams),
      ExpressionAttributeNames: {
        ...requiredAttributesExpression.ExpressionAttributeNames,
        ...expression.ExpressionAttributeNames,
      },
      ExpressionAttributeValues: {
        ...requiredAttributesExpression.ExpressionAttributeValues,
        ...expression.ExpressionAttributeValues,
      },
    };
  } else if (!_.isEmpty(Attributes) && !RequiredAttributes) {
    expression = generateScanExpression(
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
