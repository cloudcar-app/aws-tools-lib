import { cognitoClient } from './utils/cognitoClient';
import { ListUsersParams } from './types';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';

export const listUsers = async (params: ListUsersParams) => {
  const { UserPoolId } = params;
  if (UserPoolId === undefined || !UserPoolId) {
    throw new CloudcarError({
      message: MessageError.listUsers.messages.userPoolId,
      name: MessageError.listUsers.name,
    });
  }
  const users = await cognitoClient.listUsers(params).promise();
  return users.Users;
};
