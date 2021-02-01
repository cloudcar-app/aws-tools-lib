import { CognitoIdentityServiceProvider } from 'aws-sdk';
import * as hyperId from 'hyperid';
import { CreateCognitoUser } from './types';
import CloudcarError from '../errors/index';
import MessageError from '../message.errors';

const cognitoClient = process.env.AWS_COGNITO_REGION
  ? new CognitoIdentityServiceProvider({
      region: process.env.AWS_COGNITO_REGION,
    })
  : new CognitoIdentityServiceProvider();

const uuidGenerator = hyperId.default;

export const createUser = async (params: CreateCognitoUser) => {
  const { User: user, CognitoClientId, Metadata: metadata } = params;
  if (user === undefined) {
    throw new CloudcarError({
      message: MessageError.createUser.messages.user,
      name: MessageError.createUser.name,
    });
  }

  if (CognitoClientId === undefined) {
    throw new CloudcarError({
      message: MessageError.createUser.messages.clientId,
      name: MessageError.createUser.name,
    });
  }
  const userAttributes = [
    {
      Name: 'email',
      Value: user.email,
    },
    {
      Name: 'name',
      Value: user.name,
    },
  ];

  user.customAttribute?.forEach((attribute) => {
    userAttributes.push({
      Name: `custom:${attribute.name}`,
      Value: attribute.value,
    });
  });

  const data: CognitoIdentityServiceProvider.Types.SignUpRequest = {
    Password: uuidGenerator().uuid as string,
    Username: user.name,
    UserAttributes: userAttributes,
    ClientId: CognitoClientId,
    ClientMetadata: {
      ...metadata,
    },
  };

  const result = await cognitoClient.signUp(data).promise();
  if (result.UserConfirmed === undefined || result.UserConfirmed === false) {
    throw new CloudcarError({
      message: MessageError.createUser.messages.userConfirmed,
      name: MessageError.createUser.name,
    });
  }
  return result.$response;
};
