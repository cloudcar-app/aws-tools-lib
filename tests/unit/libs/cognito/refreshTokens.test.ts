/* eslint-disable @typescript-eslint/no-unused-expressions */
import { cognitoClient } from '../../../../lib/cognito/utils/cognitoClient';
import { refreshTokens } from '../../../../lib/cognito/refreshTokens';
import { expect, sinon } from '../../../libs.tests/chai.commons';
import {
  RefreshTokensParamsFactory,
  AuthenticationResultFactory,
} from '../../../factories/cognito.factory';
import MessageError from '../../../../lib/cognito/utils/message.errors';

describe('COGNITO-UNIT: refresh token', () => {
  let cognitoInitiateAuthStubStub: sinon.SinonStub<any, any>;

  beforeEach(() => {
    cognitoInitiateAuthStubStub = sinon.stub(
      cognitoClient,
      'adminInitiateAuth',
    );
  });

  afterEach(() => {
    cognitoInitiateAuthStubStub.restore();
  });

  it('[SUCCESS] should refresh tokens successfuly', async () => {
    const refreshTokenParams = RefreshTokensParamsFactory();
    cognitoInitiateAuthStubStub.returns({
      promise: () => {
        return AuthenticationResultFactory();
      },
    });
    const result = await refreshTokens(refreshTokenParams);
    expect(cognitoInitiateAuthStubStub).to.have.been.calledOnce;
    expect(result.AccessToken).to.not.be.null;
    expect(result.IdToken).to.not.be.null;
    expect(result.RefreshToken).to.not.be.null;
  });

  it('[ERROR] should return error when client id is undefined', async () => {
    try {
      const refreshTokenParams = RefreshTokensParamsFactory({
        CognitoClientId: undefined,
      });
      await refreshTokens(refreshTokenParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.refreshTokens.name);
      expect(error.message).to.equal(
        MessageError.refreshTokens.messages.clientId,
      );
    }
  });

  it('[ERROR] should return error when pool id is undefined', async () => {
    try {
      const refreshTokenParams = RefreshTokensParamsFactory({
        CognitoUserPoolId: undefined,
      });
      await refreshTokens(refreshTokenParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.refreshTokens.name);
      expect(error.message).to.equal(
        MessageError.refreshTokens.messages.poolId,
      );
    }
  });

  it('[ERROR] should return error when flow is undefined', async () => {
    try {
      const refreshTokenParams = RefreshTokensParamsFactory({
        flow: undefined,
      });
      await refreshTokens(refreshTokenParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.refreshTokens.name);
      expect(error.message).to.equal(MessageError.refreshTokens.messages.flow);
    }
  });

  it('[ERROR] should return error when refresh token is undefined', async () => {
    try {
      const refreshTokenParams = RefreshTokensParamsFactory({
        refreshToken: undefined,
      });
      await refreshTokens(refreshTokenParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.refreshTokens.name);
      expect(error.message).to.equal(
        MessageError.refreshTokens.messages.refreshToken,
      );
    }
  });

  it('[ERROR] should return error when there is no authentication result', async () => {
    try {
      const refreshTokenParams = RefreshTokensParamsFactory();
      cognitoInitiateAuthStubStub.returns({
        promise: () => {
          return {};
        },
      });
      await refreshTokens(refreshTokenParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.refreshTokens.name);
      expect(error.message).to.equal(
        MessageError.refreshTokens.messages.authResult,
      );
    }
  });
});
