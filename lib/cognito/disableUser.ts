import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { UsernameParams } from './types';
import CloudcarError from '../errors/index';
import MessageError from '../message.errors';

const cognitoClient = process.env.LOCAL
  ? new CognitoIdentityServiceProvider()
  : new CognitoIdentityServiceProvider({
      region: process.env.REGION,
    });

export const disableUser = async (params: UsernameParams) => {
  const { Username, UserPoolId } = params;
  if (Username === undefined) {
    throw new CloudcarError({
      message: MessageError.disableUser.messages.username,
      name: MessageError.disableUser.name,
    });
  }
  if (UserPoolId === undefined) {
    throw new CloudcarError({
      message: MessageError.disableUser.messages.poolId,
      name: MessageError.disableUser.name,
    });
  }
  const result = await cognitoClient.adminDisableUser(params).promise();
  return result;
};
