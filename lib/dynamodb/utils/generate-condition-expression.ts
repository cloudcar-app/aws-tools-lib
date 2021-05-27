import CloudcarError from '../../errors/index';
import {
  ComparisonOperators,
  FunctionOperators,
  SimpleOperators,
  ValidOperatorsType,
} from '../types';
import MessageError from './message.errors';

export interface ExpressionParams {
  operator: ValidOperatorsType;
  expressionArguments: any[];
}

const generateComparatorExpression = (params: ExpressionParams) => {
  const { operator, expressionArguments } = params;
  if (expressionArguments.length !== 2) {
    throw new CloudcarError({
      message:
        MessageError.generateConditionExpression.messages
          .invalidArgumentsNumber,
      name: MessageError.generateConditionExpression.name,
    });
  }
  return `(${expressionArguments[0]}) ${operator} (${expressionArguments[1]})`;
};

const generateSimpleExpression = (params: ExpressionParams) => {
  const { operator, expressionArguments } = params;
  if (expressionArguments.length !== 1) {
    throw new CloudcarError({
      message:
        MessageError.generateConditionExpression.messages
          .invalidArgumentsNumber,
      name: MessageError.generateConditionExpression.name,
    });
  }
  return `${operator} (${expressionArguments[0]})`;
};

const generateFunctionExpression = (params: ExpressionParams) => {
  const { operator, expressionArguments } = params;
  let parsedArgs = '';
  if (expressionArguments.length > 0) {
    expressionArguments.forEach((arg) => {
      parsedArgs += `${arg},`;
    });
    parsedArgs = parsedArgs.slice(0, -1);
  }
  return `${operator}(${parsedArgs})`;
};

const generateConditionExpression = (params: ExpressionParams) => {
  const { operator } = params;
  if ((<any>Object).values(ComparisonOperators).includes(operator)) {
    return generateComparatorExpression(params);
  }
  if ((<any>Object).values(FunctionOperators).includes(operator)) {
    return generateFunctionExpression(params);
  }
  if ((<any>Object).values(SimpleOperators).includes(operator)) {
    return generateSimpleExpression(params);
  }
  throw new CloudcarError({
    message:
      MessageError.generateConditionExpression.messages.invalidFunctionType,
    name: MessageError.generateConditionExpression.name,
  });
};

export default generateConditionExpression;
