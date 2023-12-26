import { cognitoClient } from './utils/cognitoClient';
import { UsernameParams } from './types';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';

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
  await cognitoClient.adminEnableUser(params);
  return { message: 'user was enable successfully' };
};
