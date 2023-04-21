import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb"; 

export const dynamo =
  process.env.STAGE === 'local'
    ? new DynamoDB({ region: 'localhost', endpoint: 'http://localhost:8000' })
    : new DynamoDB({ region: process.env.REGION || 'us-east-1' });

export const documentClient = DynamoDBDocument.from(dynamo);
