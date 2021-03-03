import { documentClient } from './dynamoClient';
// eslint-disable-next-line import/prefer-default-export
export const emptyTable = async (
  tableName: string,
  attributesToGet: string[],
) => {
  const params = {
    TableName: tableName,
    ProjectionExpression: `${attributesToGet.toString()}`,
  };
  const result = await documentClient.scan(params).promise();
  result.Items?.forEach(async (item) => {
    try {
      await documentClient
        .delete({
          TableName: tableName,
          Key: item,
        })
        .promise();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  });
};
