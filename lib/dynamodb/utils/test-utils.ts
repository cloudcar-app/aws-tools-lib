import { DynamoDB } from 'aws-sdk';

const dynamo = new DynamoDB({ region: 'us-east-1' });
const documentClient = new DynamoDB.DocumentClient({ service: dynamo });
// eslint-disable-next-line import/prefer-default-export
export const emptyTable = async (tableName: string, secondKey?: string) => {
  const params = {
    TableName: tableName,
    AttributesToGet: ['purchaseIntentId'],
  };
  if (secondKey) params.AttributesToGet.push(secondKey);
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
