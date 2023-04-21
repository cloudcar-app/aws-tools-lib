import { cognitoClient } from './utils/cognitoClient';
import { UsernameParams } from './types';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';
import { AdminEnableUserCommand } from '@aws-sdk/client-cognito-identity-provider';

/**
 * This method is to enable an account that were disable. The user will be able to
 * signin.
 */
export const enableUser = async (params: UsernameParams) => {
  const { Username, UserPoolId } = params;
  if (Username === undefined || !Username) {
    throw new CloudcarError({
      message: MessageError.enableUser.messages.username,
      name: MessageError.enableUser.name,
    });
  }
  if (UserPoolId === undefined || !UserPoolId) {
    throw new CloudcarError({
      message: MessageError.enableUser.messages.poolId,
      name: MessageError.enableUser.name,
    });
  }
  const command = new AdminEnableUserCommand(params);
  await cognitoClient.send(command)
  return { message: 'user was enable successfully' };
};
