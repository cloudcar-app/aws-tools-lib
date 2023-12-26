import {
  InitiateAuthCommandInput,
  RespondToAuthChallengeCommandInput,
} from '@aws-sdk/client-cognito-identity-provider';
import { cognitoClient } from './utils/cognitoClient';
import { AuthParams } from './types';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';

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
  const authParams: InitiateAuthCommandInput = {
    AuthFlow: flow,
    AuthParameters: {
      USERNAME: username,
    },
    ClientId: CognitoClientId,
  };
  const response = await cognitoClient.initiateAuth(authParams);
  if (response.Session) {
    const responseChallenge: RespondToAuthChallengeCommandInput = {
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
    const session = await cognitoClient.respondToAuthChallenge(
      responseChallenge,
    );
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
