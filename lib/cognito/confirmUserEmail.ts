import { cognitoClient } from './utils/cognitoClient';
import { ConfirmUserEmail } from './types';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';

export const confirmUserEmail = async (params: ConfirmUserEmail) => {
  const { Username, ClientId, ConfirmationCode } = params;
  if (Username === undefined || !Username) {
    throw new CloudcarError({
      message: MessageError.confirmUserEmail.messages.user,
      name: MessageError.confirmUserEmail.name,
    });
  }

  if (ClientId === undefined || !ClientId) {
    throw new CloudcarError({
      message: MessageError.confirmUserEmail.messages.clientId,
      name: MessageError.confirmUserEmail.name,
    });
  }

  if (ConfirmationCode === undefined || !ConfirmationCode) {
    throw new CloudcarError({
      message: MessageError.confirmUserEmail.messages.confirmationCode,
      name: MessageError.confirmUserEmail.name,
    });
  }

  const signgUpParams = {
    Username,
    ClientId,
    ConfirmationCode,
  };

  const result = await cognitoClient.confirmSignUp(signgUpParams).promise();
  return result;
};
