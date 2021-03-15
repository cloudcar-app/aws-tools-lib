import { CognitoIdentityServiceProvider } from 'aws-sdk';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';

const cognitoClient = process.env.LOCAL
  ? new CognitoIdentityServiceProvider()
  : new CognitoIdentityServiceProvider({
      region: process.env.REGION,
    });

export const adminUpdateUser = async (
  params: CognitoIdentityServiceProvider.Types.AdminUpdateUserAttributesRequest,
) => {
  const { Username, UserPoolId, UserAttributes } = params;
  if (Username === undefined) {
    throw new CloudcarError({
      message: MessageError.adminUpdateUser.messages.username,
      name: MessageError.adminUpdateUser.name,
    });
  }
  if (UserPoolId === undefined) {
    throw new CloudcarError({
      message: MessageError.adminUpdateUser.messages.poolId,
      name: MessageError.adminUpdateUser.name,
    });
  }
  if (UserAttributes === undefined) {
    throw new CloudcarError({
      message: MessageError.adminUpdateUser.messages.userAttributes,
      name: MessageError.adminUpdateUser.name,
    });
  }
  const result = await cognitoClient
    .adminUpdateUserAttributes(params)
    .promise();
  return result;
};
