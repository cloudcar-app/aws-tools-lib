import { AuthParams } from './types';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';
import { cognitoClient } from './utils/cognitoClient';
import { AdminInitiateAuthCommand, AdminInitiateAuthRequest } from '@aws-sdk/client-cognito-identity-provider';

export const authenticateWithPassword = async (authParams: AuthParams) => {
  const {
    CognitoClientId: cognitoClientId,
    username,
    password,
    CognitoUserPoolId: userPoolId,
  } = authParams;
  if (username === undefined || !username) {
    throw new CloudcarError({
      message: MessageError.login.messages.username,
      name: MessageError.login.name,
    });
  } else if (password === undefined || !password) {
    throw new CloudcarError({
      message: MessageError.login.messages.password,
      name: MessageError.login.name,
    });
  } else if (cognitoClientId === undefined || !cognitoClientId) {
    throw new CloudcarError({
      message: MessageError.login.messages.clientId,
      name: MessageError.login.name,
    });
  } else if (userPoolId === undefined || !userPoolId) {
    throw new CloudcarError({
      message: MessageError.login.messages.poolId,
      name: MessageError.login.name,
    });
  }

  const authData: AdminInitiateAuthRequest = {
    AuthFlow: 'ADMIN_USER_PASSWORD_AUTH',
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
    ClientId: cognitoClientId as string,
    UserPoolId: userPoolId as string,
  };
  const command = new AdminInitiateAuthCommand(authData);
  const response = await cognitoClient.send(command)

  if (response.AuthenticationResult) {
    return response.AuthenticationResult;
  }

  throw new CloudcarError({
    message: MessageError.login.messages.session,
    name: MessageError.login.name,
  });
};
