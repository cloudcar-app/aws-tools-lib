import { cognitoClient } from './utils/cognitoClient';
import { AuthParams } from './types';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';
import { InitiateAuthCommand, InitiateAuthRequest, RespondToAuthChallengeCommand, RespondToAuthChallengeRequest } from '@aws-sdk/client-cognito-identity-provider';

export const authenticateWithCustomFlow = async (params: AuthParams) => {
  const { username, Answer, CognitoClientId, flow } = params;
  if (Answer === undefined || !Answer) {
    throw new CloudcarError({
      message: MessageError.createPurchaseIntent.messages.apiKey,
      name: MessageError.createPurchaseIntent.name,
    });
  } else if (username === undefined || !username) {
    throw new CloudcarError({
      message: MessageError.createPurchaseIntent.messages.name,
      name: MessageError.createPurchaseIntent.name,
    });
  } else if (CognitoClientId === undefined || !CognitoClientId) {
    throw new CloudcarError({
      message: MessageError.createPurchaseIntent.messages.clientId,
      name: MessageError.createPurchaseIntent.name,
    });
  } else if (flow === undefined || !flow) {
    throw new CloudcarError({
      message: MessageError.createPurchaseIntent.messages.ip,
      name: MessageError.createPurchaseIntent.name,
    });
  }
  const authParams: InitiateAuthRequest = {
    AuthFlow: flow,
    AuthParameters: {
      USERNAME: username,
    },
    ClientId: CognitoClientId,
  };
  const command = new InitiateAuthCommand(authParams);
  const response = await cognitoClient.send(command)
  if (response.Session) {
    const responseChallenge: RespondToAuthChallengeRequest = {
      Session: response.Session,
      ClientId: CognitoClientId,
      ChallengeName: 'CUSTOM_CHALLENGE',
      ChallengeResponses: {
        USERNAME: username,
        ANSWER: Answer,
      },
      ClientMetadata: {
        Answer,
      },
    };
    const command = new RespondToAuthChallengeCommand(responseChallenge);
    const session = await cognitoClient.send(command)
    if (session.AuthenticationResult === undefined) {
      throw new CloudcarError({
        message: MessageError.createPurchaseIntent.messages.authResult,
        name: MessageError.createPurchaseIntent.name,
      });
    }
    return session.AuthenticationResult;
  }
  throw new CloudcarError({
    message: MessageError.createPurchaseIntent.messages.session,
    name: MessageError.createPurchaseIntent.name,
  });
};
