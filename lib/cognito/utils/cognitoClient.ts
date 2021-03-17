import { CognitoIdentityServiceProvider } from 'aws-sdk';

export const cognitoClient = process.env.LOCAL
  ? new CognitoIdentityServiceProvider()
  : new CognitoIdentityServiceProvider({
      region: process.env.REGION || 'us-east-1',
    });
