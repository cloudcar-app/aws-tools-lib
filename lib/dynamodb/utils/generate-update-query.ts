const generateUpdateQuery = (Item: Object) => {
  const expression = {
    UpdateExpression: 'set',
    ExpressionAttributeNames: {},
    ExpressionAttributeValues: {},
  };

  Object.entries(Item).forEach(([key, value]) => {
    expression.UpdateExpression += ` #${key} = :${key},`;
    expression.ExpressionAttributeNames[`#${key}`] = key;
    expression.ExpressionAttributeValues[`:${key}`] = value;
  });
  expression.UpdateExpression = expression.UpdateExpression.slice(0, -1);
  return expression;
};

export default generateUpdateQuery;
