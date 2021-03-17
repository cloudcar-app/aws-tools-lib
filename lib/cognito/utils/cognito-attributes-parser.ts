import { CognitoIdentityServiceProvider } from 'aws-sdk';
import CloudcarError from '../../errors/index';
import MessageError from './message.errors';
import ErrorTypes from '../../errors/errorTypes';

const removeCustomFromAttribute = (attribute: string) => {
  if (attribute.includes('custom')) {
    return attribute.replace('custom:', '');
  }
  return attribute;
};

export const asignAttributesToUse = <T>(
  attributesToGet: string[],
  cognitoAttributes: CognitoIdentityServiceProvider.AttributeListType,
  modelInstance: T,
) => {
  const model = {} as typeof modelInstance;

  if (!cognitoAttributes) {
    throw new CloudcarError({
      message: MessageError.cognitoUser.messages.undefinedAttributes,
      name: MessageError.cognitoUser.name,
      type: ErrorTypes.BANNER,
    });
  }

  cognitoAttributes.forEach((attribute) => {
    if (attributesToGet.includes(attribute.Name)) {
      model[removeCustomFromAttribute(attribute.Name)] = attribute.Value;
    }
  });
  return model;
};
