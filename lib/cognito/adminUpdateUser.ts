import { AdminUpdateUserAttributesCommand } from '@aws-sdk/client-cognito-identity-provider';
import { cognitoClient } from './utils/cognitoClient';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';
import { AdminUpdateUserParams } from './types';

export const adminUpdateUser = async (params: AdminUpdateUserParams) => {
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
  const command = new AdminUpdateUserAttributesCommand(params);
  await cognitoClient.send(command);
  return { message: 'user was updated successfully' };
};
