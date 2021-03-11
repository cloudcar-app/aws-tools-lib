import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { AuthParams } from './types';
import CloudcarError from '../errors/index';
import MessageError from '../message.errors';

const cognitoClient = process.env.LOCAL
  ? new CognitoIdentityServiceProvider()
  : new CognitoIdentityServiceProvider({
      region: process.env.REGION,
    });

// eslint-disable-next-line import/prefer-default-export
export const refreshTokens = async (authParams: AuthParams) => {
  const {
    CognitoClientId: cognitoClientId,
    refreshToken,
    flow,
    CognitoUserPoolId: userPoolId,
  } = authParams;
  if (refreshToken === undefined) {
    throw new CloudcarError({
      message: MessageError.refreshTokens.messages.refreshToken,
      name: MessageError.refreshTokens.name,
    });
  } else if (cognitoClientId === undefined) {
    throw new CloudcarError({
      message: MessageError.refreshTokens.messages.clientId,
      name: MessageError.refreshTokens.name,
    });
  } else if (userPoolId === undefined) {
    throw new CloudcarError({
      message: MessageError.refreshTokens.messages.poolId,
      name: MessageError.refreshTokens.name,
    });
  } else if (flow === undefined) {
    throw new CloudcarError({
      message: MessageError.refreshTokens.messages.flow,
      name: MessageError.refreshTokens.name,
    });
  }

  const authData: CognitoIdentityServiceProvider.Types.AdminInitiateAuthRequest = {
    AuthFlow: flow,
    AuthParameters: {
      REFRESH_TOKEN: refreshToken,
    },
    ClientId: cognitoClientId,
    UserPoolId: userPoolId,
  };

  const response = await cognitoClient.adminInitiateAuth(authData).promise();

  if (response.AuthenticationResult) {
    return response.AuthenticationResult;
  }

  throw new CloudcarError({
    message: MessageError.refreshTokens.messages.authResult,
    name: MessageError.refreshTokens.name,
  });
};
