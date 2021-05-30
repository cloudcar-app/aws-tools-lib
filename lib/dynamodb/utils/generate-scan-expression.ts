import { ValidOperatorsType, ValidOperators } from '../types';
import generateConditionExpression from './generate-condition-expression';

const generateScanExpression = (
  Item: Object,
  conditionExpressionOperator: ValidOperatorsType = ValidOperators.contains,
  expressionSeparator: ValidOperatorsType = ValidOperators.or,
) => {
  const expression = {
    FilterExpression: '',
    ExpressionAttributeNames: {},
    ExpressionAttributeValues: {},
  };
  Object.entries(Item).forEach(([key, value]) => {
    const conditionExpressionParams = {
      operator:
        typeof value !== 'string' &&
        (conditionExpressionOperator === ValidOperators.contains ||
          conditionExpressionOperator === ValidOperators.beginsWith)
          ? ValidOperators.equals
          : conditionExpressionOperator,
      expressionArguments: [`#${key}`, `:${key}`],
    };
    expression.FilterExpression += `${generateConditionExpression(
      conditionExpressionParams,
    )} ${expressionSeparator} `;
    expression.ExpressionAttributeNames[`#${key}`] = key;
    expression.ExpressionAttributeValues[`:${key}`] = value;
  });
  expression.FilterExpression = expression.FilterExpression.slice(
    0,
    -expressionSeparator.length - 1,
  );
  return expression;
};

export default generateScanExpression;
