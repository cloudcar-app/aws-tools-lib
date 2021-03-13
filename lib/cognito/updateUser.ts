import { CognitoIdentityServiceProvider } from 'aws-sdk';
import CloudcarError from '../errors/index';
import MessageError from '../message.errors';

const cognitoClient = process.env.LOCAL
  ? new CognitoIdentityServiceProvider()
  : new CognitoIdentityServiceProvider({
      region: process.env.REGION,
    });

export const updateUser = async (
  params: CognitoIdentityServiceProvider.Types.AdminUpdateUserAttributesRequest,
) => {
  const { Username, UserPoolId, UserAttributes } = params;
  if (Username === undefined) {
    throw new CloudcarError({
      message: MessageError.updateUser.messages.username,
      name: MessageError.updateUser.name,
    });
  }
  if (UserPoolId === undefined) {
    throw new CloudcarError({
      message: MessageError.updateUser.messages.poolId,
      name: MessageError.updateUser.name,
    });
  }
  if (UserAttributes === undefined) {
    throw new CloudcarError({
      message: MessageError.updateUser.messages.userAttributes,
      name: MessageError.updateUser.name,
    });
  }
  const result = await cognitoClient
    .adminUpdateUserAttributes(params)
    .promise();
  return result;
};
