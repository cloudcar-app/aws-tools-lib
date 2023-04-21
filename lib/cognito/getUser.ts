import { cognitoClient } from './utils/cognitoClient';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';
import { destructureAttributesFromCognitoUser } from './utils/cognito-attributes-parser';
import { GetUserParams } from './types';
import { GetUserCommand } from '@aws-sdk/client-cognito-identity-provider';

export const getUser = async (params: GetUserParams) => {
  const { AccessToken, attributesToGet } = params;
  if (AccessToken === undefined || !AccessToken) {
    throw new CloudcarError({
      message: MessageError.getUser.messages.accessToken,
      name: MessageError.getUser.name,
    });
  }
  const commnad = new GetUserCommand(params);
  const result = await cognitoClient.send(commnad)
  const user = destructureAttributesFromCognitoUser(
    attributesToGet,
    result.UserAttributes,
  );

  user.username = result.Username;
  return user;
};
