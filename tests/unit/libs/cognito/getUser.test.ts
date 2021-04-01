/* eslint-disable @typescript-eslint/no-unused-expressions */
import { cognitoClient } from '../../../../lib/cognito/utils/cognitoClient';
import { getUser } from '../../../../lib/cognito/getUser';
import { expect, sinon } from '../../../libs.tests/chai.commons';
import {
  GetUserResultFactory,
  GetUserParamsFactory,
  User,
} from '../../../factories/cognito.factory';
import MessageError from '../../../../lib/cognito/utils/message.errors';

describe('COGNITO-UNIT: get user', () => {
  let cognitoGetUserStubStub: sinon.SinonStub<any, any>;

  beforeEach(() => {
    cognitoGetUserStubStub = sinon.stub(cognitoClient, 'getUser');
  });

  afterEach(() => {
    cognitoGetUserStubStub.restore();
  });

  it('[SUCCESS] should get user successfuly', async () => {
    const getUserParams = GetUserParamsFactory();
    cognitoGetUserStubStub.returns({
      promise: () => {
        return GetUserResultFactory();
      },
    });
    const result = await getUser(getUserParams);
    expect(cognitoGetUserStubStub).to.have.been.calledOnce;
    expect(result).to.deep.equal(User());
  });

  it('[ERROR] should return error when access token is undefined', async () => {
    try {
      const getUserParams = GetUserParamsFactory({ AccessToken: undefined });
      await getUser(getUserParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.getUser.name);
      expect(error.message).to.equal(MessageError.getUser.messages.accessToken);
    }
  });
});
