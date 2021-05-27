import CloudcarError from '../../errors/index';
import MessageError from './message.errors';

enum ComparisonOperators {
  and = 'AND',
  or = 'OR',
  equals = '=',
  notEquals = '<>',
  lessThan = '<',
  lessThanEquals = '<=',
  greaterThan = '>',
  greaterThanEquals = '>=',
}

enum FunctionOperators {
  beginsWith = 'begins_with',
  contains = 'contains',
}

enum SimpleOperators {
  not = 'NOT',
}

export const ValidOperators = {
  ...ComparisonOperators,
  ...FunctionOperators,
  ...SimpleOperators,
};
export type ValidOperatorsType =
  | ComparisonOperators
  | FunctionOperators
  | SimpleOperators;

export interface ExpressionParams {
  operator: ValidOperatorsType;
}

const generateComparatorExpression = (params: ExpressionParams) => {
  const { operator, ...args } = params;
  if (Object.entries(args).length !== 2) {
    throw new CloudcarError({
      message:
        MessageError.generateConditionExpression.messages
          .invalidArgumentsNumber,
      name: MessageError.generateConditionExpression.name,
    });
  }
  return `(${Object.values(args)[0]}) ${operator} (${Object.values(args)[1]})`;
};

const generateSimpleExpression = (params: ExpressionParams) => {
  const { operator, ...args } = params;
  if (Object.entries(args).length !== 1) {
    throw new CloudcarError({
      message:
        MessageError.generateConditionExpression.messages
          .invalidArgumentsNumber,
      name: MessageError.generateConditionExpression.name,
    });
  }
  return `${operator} (${Object.values(args)[0]})`;
};

const generateFunctionExpression = (params: ExpressionParams) => {
  const { operator, ...args } = params;
  let parsedArgs = '';
  if (Object.entries(args).length > 0) {
    Object.values(args).forEach((arg) => {
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
