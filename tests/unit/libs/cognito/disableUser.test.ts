/* eslint-disable @typescript-eslint/no-unused-expressions */
import { cognitoClient } from '../../../../lib/cognito/utils/cognitoClient';
import { disableUser } from '../../../../lib/cognito/disableUser';
import { expect, sinon } from '../../../libs.tests/chai.commons';
import { UsernameParamsFactory } from '../../../factories/cognito.factory';
import MessageError from '../../../../lib/cognito/utils/message.errors';

describe('COGNITO-UNIT: disable user', () => {
  let cognitoDisableuserStubStub: sinon.SinonStub<any, any>;

  beforeEach(() => {
    cognitoDisableuserStubStub = sinon.stub(cognitoClient, 'adminDisableUser');
  });

  afterEach(() => {
    cognitoDisableuserStubStub.restore();
  });

  it('[SUCCESS] should disable user successfuly', async () => {
    const disableUserParams = UsernameParamsFactory();
    cognitoDisableuserStubStub.returns({
      promise: () => {
        return {};
      },
    });
    const result = await disableUser(disableUserParams);
    expect(cognitoDisableuserStubStub).to.have.been.calledOnce;
    expect(result).to.deep.equal({ message: 'user was disable successfully' });
  });

  it('[ERROR] should return error when username is undefined', async () => {
    try {
      const disableUserParams = UsernameParamsFactory({ Username: undefined });
      await disableUser(disableUserParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.disableUser.name);
      expect(error.message).to.equal(
        MessageError.disableUser.messages.username,
      );
    }
  });

  it('[ERROR] should return error when pool id is undefined', async () => {
    try {
      const disableUserParams = UsernameParamsFactory({
        UserPoolId: undefined,
      });
      await disableUser(disableUserParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.disableUser.name);
      expect(error.message).to.equal(MessageError.disableUser.messages.poolId);
    }
  });
});
