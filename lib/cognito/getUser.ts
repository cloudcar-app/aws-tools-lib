import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { cognitoClient } from './utils/cognitoClient';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';

export const getUser = async (
  params: CognitoIdentityServiceProvider.Types.GetUserRequest,
) => {
  const { AccessToken } = params;
  if (AccessToken === undefined || !AccessToken) {
    throw new CloudcarError({
      message: MessageError.getUser.messages.accessToken,
      name: MessageError.getUser.name,
    });
  }
  const result = await cognitoClient.getUser(params).promise();
  return result;
};
