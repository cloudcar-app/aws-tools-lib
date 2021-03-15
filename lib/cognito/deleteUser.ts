import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { UsernameParams } from './types';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';

const cognitoClient = process.env.LOCAL
  ? new CognitoIdentityServiceProvider()
  : new CognitoIdentityServiceProvider({
      region: process.env.REGION,
    });

export const deleteUser = async (params: UsernameParams) => {
  const { Username, UserPoolId } = params;
  if (Username === undefined) {
    throw new CloudcarError({
      message: MessageError.deleteUser.messages.username,
      name: MessageError.deleteUser.name,
    });
  }
  if (UserPoolId === undefined) {
    throw new CloudcarError({
      message: MessageError.deleteUser.messages.poolId,
      name: MessageError.deleteUser.name,
    });
  }
  const result = await cognitoClient.adminDeleteUser(params).promise();
  return result;
};
