/* eslint-disable @typescript-eslint/no-unused-expressions */
import { cognitoClient } from '../../../../lib/cognito/utils/cognitoClient';
import { deleteUser } from '../../../../lib/cognito/deleteUser';
import { expect, sinon } from '../../../libs.tests/chai.commons';
import { UsernameParamsFactory } from '../../../factories/cognito.factory';
import MessageError from '../../../../lib/cognito/utils/message.errors';

describe('COGNITO-UNIT: delete user', () => {
  let cognitoDeleteuserStubStub: sinon.SinonStub<any, any>;

  beforeEach(() => {
    cognitoDeleteuserStubStub = sinon.stub(cognitoClient, 'adminDeleteUser');
  });

  afterEach(() => {
    cognitoDeleteuserStubStub.restore();
  });

  it('[SUCCESS] should delete user successfuly', async () => {
    const deleteUserParams = UsernameParamsFactory();
    cognitoDeleteuserStubStub.returns({
      promise: () => {
        return {};
      },
    });
    const result = await deleteUser(deleteUserParams);
    expect(cognitoDeleteuserStubStub).to.have.been.calledOnce;
    expect(result).to.deep.equal({ message: 'user was delete successfully' });
  });

  it('[ERROR] should return error when username is undefined', async () => {
    try {
      const deleteUserParams = UsernameParamsFactory({ Username: undefined });
      await deleteUser(deleteUserParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.deleteUser.name);
      expect(error.message).to.equal(MessageError.deleteUser.messages.username);
    }
  });

  it('[ERROR] should return error when pool id is undefined', async () => {
    try {
      const deleteUserParams = UsernameParamsFactory({
        UserPoolId: undefined,
      });
      await deleteUser(deleteUserParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.deleteUser.name);
      expect(error.message).to.equal(MessageError.deleteUser.messages.poolId);
    }
  });
});
