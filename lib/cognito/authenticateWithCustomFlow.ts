import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { AuthParams } from './types';
import CloudcarError from '../errors/index';
import MessageError from '../message.errors';

const cognitoClient = process.env.LOCAL
  ? new CognitoIdentityServiceProvider()
  : new CognitoIdentityServiceProvider({
      region: process.env.REGION,
    });

export const authenticateWithCustomFlow = async (params: AuthParams) => {
  const { username, Answer, CognitoClientId, flow } = params;
  if (Answer === undefined) {
    throw new CloudcarError({
      message: MessageError.createPurchaseIntent.messages.apiKey,
      name: MessageError.createPurchaseIntent.name,
    });
  } else if (username === undefined) {
    throw new CloudcarError({
      message: MessageError.createPurchaseIntent.messages.name,
      name: MessageError.createPurchaseIntent.name,
    });
  } else if (CognitoClientId === undefined) {
    throw new CloudcarError({
      message: MessageError.createPurchaseIntent.messages.clientId,
      name: MessageError.createPurchaseIntent.name,
    });
  } else if (flow === undefined) {
    throw new CloudcarError({
      message: MessageError.createPurchaseIntent.messages.ip,
      name: MessageError.createPurchaseIntent.name,
    });
  }
  const authParams: CognitoIdentityServiceProvider.Types.InitiateAuthRequest = {
    AuthFlow: flow,
    AuthParameters: {
      USERNAME: username,
    },
    ClientId: CognitoClientId,
  };
  const response = await cognitoClient.initiateAuth(authParams).promise();
  if (response.Session) {
    const responseChallenge: CognitoIdentityServiceProvider.Types.RespondToAuthChallengeRequest = {
      Session: response.Session,
      ClientId: CognitoClientId,
      ChallengeName: 'CUSTOM_CHALLENGE',
      ChallengeResponses: {
        USERNAME: username,
        ANSWER: Answer,
      },
    };
    const session = await cognitoClient
      .respondToAuthChallenge(responseChallenge)
      .promise();
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