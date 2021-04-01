/* eslint-disable @typescript-eslint/no-unused-expressions */
import { cognitoClient } from '../../../../lib/cognito/utils/cognitoClient';
import { enableUser } from '../../../../lib/cognito/enableUser';
import { expect, sinon } from '../../../libs.tests/chai.commons';
import { UsernameParamsFactory } from '../../../factories/cognito.factory';
import MessageError from '../../../../lib/cognito/utils/message.errors';

describe('COGNITO-UNIT: enable user', () => {
  let cognitoEnableuserStubStub: sinon.SinonStub<any, any>;

  beforeEach(() => {
    cognitoEnableuserStubStub = sinon.stub(cognitoClient, 'adminEnableUser');
  });

  afterEach(() => {
    cognitoEnableuserStubStub.restore();
  });

  it('[SUCCESS] should enable user successfuly', async () => {
    const enableUserParams = UsernameParamsFactory();
    cognitoEnableuserStubStub.returns({
      promise: () => {
        return {};
      },
    });
    const result = await enableUser(enableUserParams);
    expect(cognitoEnableuserStubStub).to.have.been.calledOnce;
    expect(result).to.deep.equal({ message: 'user was enable successfully' });
  });

  it('[ERROR] should return error when username is undefined', async () => {
    try {
      const enableUserParams = UsernameParamsFactory({ Username: undefined });
      await enableUser(enableUserParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.enableUser.name);
      expect(error.message).to.equal(MessageError.enableUser.messages.username);
    }
  });

  it('[ERROR] should return error when pool id is undefined', async () => {
    try {
      const enableUserParams = UsernameParamsFactory({
        UserPoolId: undefined,
      });
      await enableUser(enableUserParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.enableUser.name);
      expect(error.message).to.equal(MessageError.enableUser.messages.poolId);
    }
  });
});
