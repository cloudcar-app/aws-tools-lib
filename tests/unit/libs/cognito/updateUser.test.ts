/* eslint-disable @typescript-eslint/no-unused-expressions */
import { cognitoClient } from '../../../../lib/cognito/utils/cognitoClient';
import { updateUser } from '../../../../lib/cognito/updateUser';
import { expect, sinon } from '../../../libs.tests/chai.commons';
import { UpdateUserParamsFactory } from '../../../factories/cognito.factory';
import MessageError from '../../../../lib/cognito/utils/message.errors';

describe('COGNITO-UNIT: update user', () => {
  let cognitoUpdateUserStubStub: sinon.SinonStub<any, any>;

  beforeEach(() => {
    cognitoUpdateUserStubStub = sinon.stub(
      cognitoClient,
      'updateUserAttributes',
    );
  });

  afterEach(() => {
    cognitoUpdateUserStubStub.restore();
  });

  it('[SUCCESS] should update user successfuly', async () => {
    const updateUserParams = UpdateUserParamsFactory();
    cognitoUpdateUserStubStub.returns({
      promise: () => {
        return {};
      },
    });
    const result = await updateUser(updateUserParams);
    expect(cognitoUpdateUserStubStub).to.have.been.calledOnce;
    expect(result).to.deep.equal({});
  });

  it('[ERROR] should return error when access token is undefined', async () => {
    try {
      const updateUserParams = UpdateUserParamsFactory({
        AccessToken: undefined,
      });
      await updateUser(updateUserParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.updateUser.name);
      expect(error.message).to.equal(
        MessageError.updateUser.messages.accessToken,
      );
    }
  });

  it('[ERROR] should return error when user attributes are undefined', async () => {
    try {
      const updateUserParams = UpdateUserParamsFactory({
        UserAttributes: undefined,
      });
      await updateUser(updateUserParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.updateUser.name);
      expect(error.message).to.equal(
        MessageError.updateUser.messages.userAttributes,
      );
    }
  });
});
