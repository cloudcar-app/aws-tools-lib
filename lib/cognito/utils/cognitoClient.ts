import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

export const cognitoClient = process.env.LOCAL
  ? new CognitoIdentityProviderClient({})
  : new CognitoIdentityProviderClient({
      region: process.env.REGION || 'us-east-1',
    });
