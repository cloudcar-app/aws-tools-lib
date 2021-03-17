/* eslint-disable max-len */
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import CloudcarError from '../../errors/index';
import MessageError from './message.errors';
import ErrorTypes from '../../errors/errorTypes';
import { CognitoUser } from '../types';

/**
 * return a parsed attribute name. if the attribute has 'custom' as a prefix it is eliminated, otherwise the attribute itself is returned.
 */
const parseAttributeName = (attribute: string) => {
  if (attribute.includes('custom')) {
    return attribute.replace('custom:', '');
  }
  return attribute;
};

/**
 * return a instance of an user. This method receives a list of the names of the attributes to be destructured from the cognito user, together with the list of all the attributes of the cognito user result. The method internally calls 'parseAttributeName' to assign the cognito attributes without the custom prefix.
 */
export const destructureAttributesFromCognitoUser = (
  attributesToGet: string[],
  cognitoUserAttributes:
    | CognitoIdentityServiceProvider.AttributeListType
    | undefined,
) => {
  const user = {} as CognitoUser;

  if (!cognitoUserAttributes) {
    throw new CloudcarError({
      message: MessageError.cognitoUser.messages.undefinedAttributes,
      name: MessageError.cognitoUser.name,
      type: ErrorTypes.BANNER,
    });
  }

  cognitoUserAttributes.forEach((attribute) => {
    if (attributesToGet.includes(attribute.Name)) {
      const attributeName = parseAttributeName(attribute.Name);
      user[attributeName] = attribute.Value;
    }
  });

  return user;
};
