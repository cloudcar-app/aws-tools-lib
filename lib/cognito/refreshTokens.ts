import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { cognitoClient } from './utils/cognitoClient';
import { AuthParams } from './types';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';

export const refreshTokens = async (authParams: AuthParams) => {
  const {
    CognitoClientId: cognitoClientId,
    refreshToken,
    flow,
    CognitoUserPoolId: userPoolId,
  } = authParams;
  if (refreshToken === undefined || !refreshToken) {
    throw new CloudcarError({
      message: MessageError.refreshTokens.messages.refreshToken,
      name: MessageError.refreshTokens.name,
    });
  } else if (cognitoClientId === undefined || !cognitoClientId) {
    throw new CloudcarError({
      message: MessageError.refreshTokens.messages.clientId,
      name: MessageError.refreshTokens.name,
    });
  } else if (userPoolId === undefined || !userPoolId) {
    throw new CloudcarError({
      message: MessageError.refreshTokens.messages.poolId,
      name: MessageError.refreshTokens.name,
    });
  } else if (flow === undefined || !flow) {
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
