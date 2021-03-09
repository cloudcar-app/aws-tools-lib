/* eslint-disable prettier/prettier */
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { ListUsersParams } from './types';
import CloudcarError from '../errors/index';
import MessageError from '../message.errors';

const cognitoClient = process.env.LOCAL
  ? new CognitoIdentityServiceProvider()
  : new CognitoIdentityServiceProvider({
    region: process.env.REGION,
  });

export const listUsers = async (params: ListUsersParams) => {
  const { UserPoolId } = params;
  if (UserPoolId === undefined) {
    throw new CloudcarError({
      message: MessageError.listUsers.messages.userPoolId,
      name: MessageError.listUsers.name,
    });
  }
  const users = await cognitoClient.listUsers(params).promise();
  return users.Users;
};
