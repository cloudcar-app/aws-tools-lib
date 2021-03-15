import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { AuthParams } from './types';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';

const cognitoClient = process.env.LOCAL
  ? new CognitoIdentityServiceProvider()
  : new CognitoIdentityServiceProvider({
      region: process.env.REGION,
    });
// eslint-disable-next-line import/prefer-default-export
export const authenticateWithPassword = async (authParams: AuthParams) => {
  const {
    CognitoClientId: cognitoClientId,
    username,
    password,
    CognitoUserPoolId: userPoolId,
  } = authParams;
  if (username === undefined) {
    throw new CloudcarError({
      message: MessageError.login.messages.username,
      name: MessageError.login.name,
    });
  } else if (password === undefined) {
    throw new CloudcarError({
      message: MessageError.login.messages.password,
      name: MessageError.login.name,
    });
  } else if (cognitoClientId === undefined) {
    throw new CloudcarError({
      message: MessageError.login.messages.clientId,
      name: MessageError.login.name,
    });
  } else if (userPoolId === undefined) {
    throw new CloudcarError({
      message: MessageError.login.messages.poolId,
      name: MessageError.login.name,
    });
  }

  const authData: CognitoIdentityServiceProvider.Types.AdminInitiateAuthRequest = {
    AuthFlow: 'ADMIN_USER_PASSWORD_AUTH',
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
    ClientId: cognitoClientId as string,
    UserPoolId: userPoolId as string,
  };

  const response = await cognitoClient.adminInitiateAuth(authData).promise();

  if (response.AuthenticationResult) {
    return response.AuthenticationResult;
  }

  throw new CloudcarError({
    message: MessageError.login.messages.session,
    name: MessageError.login.name,
  });
};
