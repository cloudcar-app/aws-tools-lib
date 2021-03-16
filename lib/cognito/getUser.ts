import { CognitoIdentityServiceProvider } from 'aws-sdk';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';

const cognitoClient = process.env.LOCAL
  ? new CognitoIdentityServiceProvider()
  : new CognitoIdentityServiceProvider({
      region: process.env.REGION,
    });

export const getUser = async (
  params: CognitoIdentityServiceProvider.Types.GetUserRequest,
) => {
  const { AccessToken } = params;
  if (AccessToken === undefined) {
    throw new CloudcarError({
      message: MessageError.getUser.messages.accessToken,
      name: MessageError.getUser.name,
    });
  }
  const result = await cognitoClient.getUser(params).promise();
  return result;
};
