/* eslint-disable @typescript-eslint/no-unused-expressions */
import { cognitoClient } from '../../../../lib/cognito/utils/cognitoClient';
import { adminUpdateUser } from '../../../../lib/cognito/adminUpdateUser';
import { expect, sinon } from '../../../libs.tests/chai.commons';
import { AdminUpdateUserParamsFactory } from '../../../factories/cognito.factory';
import MessageError from '../../../../lib/cognito/utils/message.errors';

describe('COGNITO-UNIT: admin update user', () => {
  let cognitoAdminUpdateUserStubStub: sinon.SinonStub<any, any>;

  beforeEach(() => {
    cognitoAdminUpdateUserStubStub = sinon.stub(
      cognitoClient,
      'adminUpdateUserAttributes',
    );
  });

  afterEach(() => {
    cognitoAdminUpdateUserStubStub.restore();
  });

  it('[SUCCESS] should update user successfuly', async () => {
    const updateUserParams = AdminUpdateUserParamsFactory();
    cognitoAdminUpdateUserStubStub.returns({
      promise: () => {
        return {};
      },
    });
    const result = await adminUpdateUser(updateUserParams);
    expect(cognitoAdminUpdateUserStubStub).to.have.been.calledOnce;
    expect(result).to.deep.equal({ message: 'user was updated successfully' });
  });

  it('[ERROR] should return error when username is undefined', async () => {
    try {
      const updateUserParams = AdminUpdateUserParamsFactory({
        Username: undefined,
      });
      await adminUpdateUser(updateUserParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.adminUpdateUser.name);
      expect(error.message).to.equal(
        MessageError.adminUpdateUser.messages.username,
      );
    }
  });

  it('[ERROR] should return error when pool id is undefined', async () => {
    try {
      const updateUserParams = AdminUpdateUserParamsFactory({
        UserPoolId: undefined,
      });
      await adminUpdateUser(updateUserParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.adminUpdateUser.name);
      expect(error.message).to.equal(
        MessageError.adminUpdateUser.messages.poolId,
      );
    }
  });

  it('[ERROR] should return error when user attributes are undefined', async () => {
    try {
      const updateUserParams = AdminUpdateUserParamsFactory({
        UserAttributes: undefined,
      });
      await adminUpdateUser(updateUserParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.adminUpdateUser.name);
      expect(error.message).to.equal(
        MessageError.adminUpdateUser.messages.userAttributes,
      );
    }
  });
});
