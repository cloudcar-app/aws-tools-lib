/* eslint-disable max-len */
/**
 * the function receives a second parameter which represents the key to compare with each of the received values. If the table object has the key equal to some, it is returned
 */
const generateExactScanExpresion = (Item: Object, searchKey: string) => {
  const expression = {
    FilterExpression: '',
    ExpressionAttributeNames: {},
    ExpressionAttributeValues: {},
  };
  Object.entries(Item).forEach(([key, value]) => {
    expression.FilterExpression += `#${key} = :${key} OR `;
    expression.ExpressionAttributeNames[`#${key}`] = searchKey;
    expression.ExpressionAttributeValues[`:${key}`] = value;
  });
  expression.FilterExpression = expression.FilterExpression.slice(0, -3);
  return expression;
};

export default generateExactScanExpresion;
