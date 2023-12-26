import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';

export const cognitoClient = process.env.LOCAL
  ? new CognitoIdentityProvider()
  : new CognitoIdentityProvider({
      region: process.env.REGION || 'us-east-1',
    });
