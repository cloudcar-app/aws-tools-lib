import { cognitoClient } from './utils/cognitoClient';
import { ListUsersParams, CognitoUser } from './types';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';
import { destructureAttributesFromCognitoUser } from './utils/cognito-attributes-parser';
import { ListUsersCommand } from '@aws-sdk/client-cognito-identity-provider';

export const listUsers = async (
  attributesToGet: string[],
  params: ListUsersParams,
) => {
  const { UserPoolId } = params;
  if (UserPoolId === undefined || !UserPoolId) {
    throw new CloudcarError({
      message: MessageError.listUsers.messages.userPoolId,
      name: MessageError.listUsers.name,
    });
  }
  const commnad = new ListUsersCommand(params);
  const result = await cognitoClient.send(commnad)

  const usersList: CognitoUser[] = [];

  if (result.Users !== undefined) {
    result.Users.forEach((cognitoUser) => {
      const user = destructureAttributesFromCognitoUser(
        attributesToGet,
        cognitoUser.Attributes,
      );
      user.username = cognitoUser.Username;
      user.enabled = cognitoUser.Enabled;
      usersList.push(user);
    });
  }

  return usersList;
};
