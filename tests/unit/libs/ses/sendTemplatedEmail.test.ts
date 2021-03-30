/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ses } from '../../../../lib/ses/utils/sesClient';
import { sendTemplatedEmail } from '../../../../lib/ses/sendTemplatedEmail';
import { expect, sinon } from '../../../libs.tests/chai.commons';
import { SendTemplatedEmailSESParamsFactory } from '../../../factories/ses.factory';
import MessageError from '../../../../lib/ses/utils/message.errors';

describe('SES: send templated email', () => {
  let sesSendTemplatedEmailStub: sinon.SinonStub<any, any>;

  beforeEach(() => {
    sesSendTemplatedEmailStub = sinon.stub(ses, 'sendTemplatedEmail');
  });

  afterEach(() => {
    sesSendTemplatedEmailStub.restore();
  });

  it('[SUCCESS] should return the message id', async () => {
    const sendEmailParams = SendTemplatedEmailSESParamsFactory();
    const messageId = 'some-message-id';
    sesSendTemplatedEmailStub.returns({
      promise: () => {
        return { messageId };
      },
    });
    const result = await sendTemplatedEmail(sendEmailParams);
    expect(sesSendTemplatedEmailStub).to.have.been.calledOnce;
    expect(result).to.be.deep.equal({ messageId });
  });

  it('[ERROR] should return error when template name is undefined', async () => {
    try {
      const sendEmailParams = SendTemplatedEmailSESParamsFactory({
        template: undefined,
      });
      await sendTemplatedEmail(sendEmailParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.sendTemplatedEmail.name);
      expect(error.message).to.equal(
        MessageError.sendTemplatedEmail.messages.template,
      );
    }
  });

  it('[ERROR] should return error when template data is undefined', async () => {
    try {
      const sendEmailParams = SendTemplatedEmailSESParamsFactory({
        templateData: undefined,
      });
      await sendTemplatedEmail(sendEmailParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.sendTemplatedEmail.name);
      expect(error.message).to.equal(
        MessageError.sendTemplatedEmail.messages.templateData,
      );
    }
  });

  it('[ERROR] should return error when sender is undefined', async () => {
    try {
      const sendEmailParams = SendTemplatedEmailSESParamsFactory({
        from: undefined,
      });
      await sendTemplatedEmail(sendEmailParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.sendTemplatedEmail.name);
      expect(error.message).to.equal(
        MessageError.sendTemplatedEmail.messages.from,
      );
    }
  });

  it('[ERROR] should return error when receiver are undefined', async () => {
    try {
      const sendEmailParams = SendTemplatedEmailSESParamsFactory({
        to: undefined,
      });
      await sendTemplatedEmail(sendEmailParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.sendTemplatedEmail.name);
      expect(error.message).to.equal(
        MessageError.sendTemplatedEmail.messages.to,
      );
    }
  });
});
