import { AdminDisableUserCommand } from '@aws-sdk/client-cognito-identity-provider';
import { cognitoClient } from './utils/cognitoClient';
import { UsernameParams } from './types';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';

/**
 * This method is to disable the account. The user will not be able to
 * signin.
 */

export const disableUser = async (params: UsernameParams) => {
  const { Username, UserPoolId } = params;
  if (Username === undefined || !Username) {
    throw new CloudcarError({
      message: MessageError.disableUser.messages.username,
      name: MessageError.disableUser.name,
    });
  }
  if (UserPoolId === undefined || !UserPoolId) {
    throw new CloudcarError({
      message: MessageError.disableUser.messages.poolId,
      name: MessageError.disableUser.name,
    });
  }
  const command = new AdminDisableUserCommand(params);
  await cognitoClient.send(command);
  return { message: 'user was disable successfully' };
};
