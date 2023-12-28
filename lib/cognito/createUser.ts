import { v1 as uuidV1 } from 'uuid';
import {
  SignUpCommand,
  SignUpRequest,
} from '@aws-sdk/client-cognito-identity-provider';
import { cognitoClient } from './utils/cognitoClient';
import { CreateCognitoUser } from './types';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';

export const createUser = async (params: CreateCognitoUser) => {
  const { User: user, CognitoClientId, Metadata: metadata } = params;
  if (user === undefined || !user) {
    throw new CloudcarError({
      message: MessageError.createUser.messages.user,
      name: MessageError.createUser.name,
    });
  }

  if (CognitoClientId === undefined || !CognitoClientId) {
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

  const data: SignUpRequest = {
    Password: user.password ? user.password : (uuidV1() as string),
    Username: user.username ? user.username : user.name,
    UserAttributes: userAttributes,
    ClientId: CognitoClientId,
    ClientMetadata: {
      ...metadata,
    },
  };
  const command = new SignUpCommand(data);
  const result = await cognitoClient.send(command);
  return result;
};
