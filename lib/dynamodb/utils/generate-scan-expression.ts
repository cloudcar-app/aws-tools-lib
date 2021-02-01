const generateScanExpression = (Item: Object) => {
  const expression = {
    FilterExpression: '',
    ExpressionAttributeNames: {},
    ExpressionAttributeValues: {},
  };
  Object.entries(Item).forEach(([key, value]) => {
    expression.FilterExpression += `begins_with(#${key}, :${key}) OR `;
    expression.ExpressionAttributeNames[`#${key}`] = key;
    expression.ExpressionAttributeValues[`:${key}`] = value;
  });
  expression.FilterExpression = expression.FilterExpression.slice(0, -3);
  return expression;
};

export default generateScanExpression;
