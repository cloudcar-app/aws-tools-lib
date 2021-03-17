/* eslint-disable max-len */
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import CloudcarError from '../../errors/index';
import MessageError from './message.errors';
import ErrorTypes from '../../errors/errorTypes';
import { CognitoUser } from '../types';

/**
 * remove the 'custom:' string from a cognito user attribute
 */
const removeCustomFromAttribute = (attribute: string) => {
  if (attribute.includes('custom')) {
    return attribute.replace('custom:', '');
  }
  return attribute;
};

/**
 * return a instance of an user. calling this action requires a list of strings representing the attributes to get from a cognito user and the cognito user itself
 */
export const assignAttributesToUse = (
  attributesToGet: string[],
  cognitoUser: CognitoIdentityServiceProvider.GetUserResponse,
) => {
  const user = {} as CognitoUser;

  if (!cognitoUser.UserAttributes) {
    throw new CloudcarError({
      message: MessageError.cognitoUser.messages.undefinedAttributes,
      name: MessageError.cognitoUser.name,
      type: ErrorTypes.BANNER,
    });
  }

  cognitoUser.UserAttributes.forEach((attribute) => {
    if (attributesToGet.includes(attribute.Name)) {
      user[removeCustomFromAttribute(attribute.Name)] = attribute.Value;
    }
  });

  user.username = cognitoUser.Username;

  return user;
};
