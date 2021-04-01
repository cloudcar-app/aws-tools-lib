/* eslint-disable @typescript-eslint/no-unused-expressions */
import { cognitoClient } from '../../../../lib/cognito/utils/cognitoClient';
import { createUser } from '../../../../lib/cognito/createUser';
import { expect, sinon } from '../../../libs.tests/chai.commons';
import { CreateCognitoUserParamsFactory } from '../../../factories/cognito.factory';
import MessageError from '../../../../lib/cognito/utils/message.errors';

describe('COGNITO-UNIT: create user', () => {
  let cognitoCreateuserStubStub: sinon.SinonStub<any, any>;

  beforeEach(() => {
    cognitoCreateuserStubStub = sinon.stub(cognitoClient, 'signUp');
  });

  afterEach(() => {
    cognitoCreateuserStubStub.restore();
  });

  it('[SUCCESS] should create user successfuly', async () => {
    const createUserParams = CreateCognitoUserParamsFactory();
    cognitoCreateuserStubStub.returns({
      promise: () => {
        return { UserConfirmed: true };
      },
    });
    const result = await createUser(createUserParams);
    expect(cognitoCreateuserStubStub).to.have.been.calledOnce;
    expect(result.UserConfirmed).to.equal(true);
  });

  it('[ERROR] should return error when User is undefined', async () => {
    try {
      const createUserParams = CreateCognitoUserParamsFactory({
        User: undefined,
      });
      await createUser(createUserParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.createUser.name);
      expect(error.message).to.equal(MessageError.createUser.messages.user);
    }
  });

  it('[ERROR] should return error when client id is undefined', async () => {
    try {
      const createUserParams = CreateCognitoUserParamsFactory({
        CognitoClientId: undefined,
      });
      await createUser(createUserParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.createUser.name);
      expect(error.message).to.equal(MessageError.createUser.messages.clientId);
    }
  });

  it('[ERROR] should return error when cognito user is not confirmed', async () => {
    try {
      cognitoCreateuserStubStub.returns({
        promise: () => {
          return { UserConfirmed: false };
        },
      });
      const createUserParams = CreateCognitoUserParamsFactory();
      await createUser(createUserParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(cognitoCreateuserStubStub).to.have.been.calledOnce;
      expect(error.name).to.equal(MessageError.createUser.name);
      expect(error.message).to.equal(
        MessageError.createUser.messages.userConfirmed,
      );
    }
  });
});
