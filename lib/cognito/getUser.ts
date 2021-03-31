import { cognitoClient } from './utils/cognitoClient';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';
import { destructureAttributesFromCognitoUser } from './utils/cognito-attributes-parser';
import { GetUserParams } from './types';

export const getUser = async (params: GetUserParams) => {
  const { AccessToken, attributesToGet } = params;
  if (AccessToken === undefined || !AccessToken) {
    throw new CloudcarError({
      message: MessageError.getUser.messages.accessToken,
      name: MessageError.getUser.name,
    });
  }

  const result = await cognitoClient.getUser({ AccessToken }).promise();
  const user = destructureAttributesFromCognitoUser(
    attributesToGet,
    result.UserAttributes,
  );

  user.username = result.Username;
  return user;
};
