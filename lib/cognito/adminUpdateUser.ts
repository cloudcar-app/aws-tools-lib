import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { cognitoClient } from './utils/cognitoClient';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';

export const adminUpdateUser = async (
  params: CognitoIdentityServiceProvider.Types.AdminUpdateUserAttributesRequest,
) => {
  const { Username, UserPoolId, UserAttributes } = params;
  if (Username === undefined || !Username) {
    throw new CloudcarError({
      message: MessageError.adminUpdateUser.messages.username,
      name: MessageError.adminUpdateUser.name,
    });
  }
  if (UserPoolId === undefined || !UserPoolId) {
    throw new CloudcarError({
      message: MessageError.adminUpdateUser.messages.poolId,
      name: MessageError.adminUpdateUser.name,
    });
  }
  if (UserAttributes === undefined || !UserAttributes) {
    throw new CloudcarError({
      message: MessageError.adminUpdateUser.messages.userAttributes,
      name: MessageError.adminUpdateUser.name,
    });
  }
  const result = await cognitoClient
    .adminUpdateUserAttributes(params)
    .promise();
  return result;
};
