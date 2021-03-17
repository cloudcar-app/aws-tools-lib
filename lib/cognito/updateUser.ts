import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { cognitoClient } from './utils/cognitoClient';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';

export const updateUser = async (
  params: CognitoIdentityServiceProvider.Types.UpdateUserAttributesRequest,
) => {
  const { AccessToken, UserAttributes } = params;
  if (AccessToken === undefined || !AccessToken) {
    throw new CloudcarError({
      message: MessageError.updateUser.messages.accessToken,
      name: MessageError.updateUser.name,
    });
  }
  if (UserAttributes === undefined || !UserAttributes) {
    throw new CloudcarError({
      message: MessageError.updateUser.messages.userAttributes,
      name: MessageError.updateUser.name,
    });
  }
  const result = await cognitoClient.updateUserAttributes(params).promise();
  return result;
};
