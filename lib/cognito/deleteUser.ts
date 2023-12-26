import { cognitoClient } from './utils/cognitoClient';
import { UsernameParams } from './types';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';

/**
 * This method is to delete an account. The user will not be able to
 * signin anymore.
 */
export const deleteUser = async (params: UsernameParams) => {
  const { Username, UserPoolId } = params;
  if (Username === undefined || !Username) {
    throw new CloudcarError({
      message: MessageError.deleteUser.messages.username,
      name: MessageError.deleteUser.name,
    });
  }
  if (UserPoolId === undefined || !UserPoolId) {
    throw new CloudcarError({
      message: MessageError.deleteUser.messages.poolId,
      name: MessageError.deleteUser.name,
    });
  }
  await cognitoClient.adminDeleteUser(params);
  return { message: 'user was delete successfully' };
};
