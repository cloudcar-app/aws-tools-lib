import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { UsernameParams } from './types';
import CloudcarError from '../errors/index';
import MessageError from '../message.errors';

const cognitoClient = process.env.LOCAL
  ? new CognitoIdentityServiceProvider()
  : new CognitoIdentityServiceProvider({
      region: process.env.REGION,
    });

export const enableUser = async (params: UsernameParams) => {
  const { Username, UserPoolId } = params;
  if (Username === undefined) {
    throw new CloudcarError({
      message: MessageError.enableUser.messages.username,
      name: MessageError.enableUser.name,
    });
  }
  if (UserPoolId === undefined) {
    throw new CloudcarError({
      message: MessageError.enableUser.messages.poolId,
      name: MessageError.enableUser.name,
    });
  }
  const result = await cognitoClient.adminEnableUser(params).promise();
  return result;
};
