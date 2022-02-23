import { DynamoDB } from 'aws-sdk';

export const dynamo =
  process.env.STAGE === 'local'
    ? new DynamoDB({ region: 'localhost', endpoint: 'http://localhost:8000' })
    : new DynamoDB({ region: process.env.REGION || 'us-east-1' });

export const documentClient = new DynamoDB.DocumentClient({ service: dynamo });
