/* eslint-disable @typescript-eslint/no-unused-expressions */
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { disableUser } from '../../../../lib/cognito/disableUser';
import { UsernameParams } from '../../../../lib/cognito/types';
import { expect, sinon } from '../../../libs.tests/chai.commons';

describe.skip('AWS-WRAPPER: createItem', () => {
  let cognitoDisableuserStubStub: sinon.SinonStub<any, any>;

  beforeEach(() => {
    cognitoDisableuserStubStub = sinon.stub(
      CognitoIdentityServiceProvider.prototype,
      'adminDisableUser',
    );
  });

  afterEach(() => {
    cognitoDisableuserStubStub.restore();
  });

  it('[SUCCESS] should not return a error', async () => {
    // const createDynamoParams = PutDynamoParamsFactory();
    const username: UsernameParams = {
      UserPoolId: '',
      Username: 'cloudcar-admin',
    };

    cognitoDisableuserStubStub.returns({
      promise: () => {
        return {};
      },
    });
    await disableUser(username);
    expect(cognitoDisableuserStubStub).to.have.been.calledOnce;
    // expect(values).to.deep.keys(Item);
  });
});
