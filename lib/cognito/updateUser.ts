import { UpdateUserAttributesCommand } from '@aws-sdk/client-cognito-identity-provider';
import { cognitoClient } from './utils/cognitoClient';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';
import { UpdateUserParams } from './types';

export const updateUser = async (params: UpdateUserParams) => {
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
  const command = new UpdateUserAttributesCommand(params);
  const result = await cognitoClient.send(command);
  return result;
};
