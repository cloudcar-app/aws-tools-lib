import { CognitoIdentityServiceProvider } from 'aws-sdk';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';

const cognitoClient = process.env.LOCAL
  ? new CognitoIdentityServiceProvider()
  : new CognitoIdentityServiceProvider({
      region: process.env.REGION,
    });

export const updateUser = async (
  params: CognitoIdentityServiceProvider.Types.UpdateUserAttributesRequest,
) => {
  const { AccessToken, UserAttributes } = params;
  if (AccessToken === undefined) {
    throw new CloudcarError({
      message: MessageError.updateUser.messages.accessToken,
      name: MessageError.updateUser.name,
    });
  }
  if (UserAttributes === undefined) {
    throw new CloudcarError({
      message: MessageError.updateUser.messages.userAttributes,
      name: MessageError.updateUser.name,
    });
  }
  const result = await cognitoClient.updateUserAttributes(params).promise();
  return result;
};
