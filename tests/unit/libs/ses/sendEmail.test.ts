/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ses } from '../../../../lib/ses/utils/sesClient';
import { sendEmail } from '../../../../lib/ses/sendEmail';
import { expect, sinon } from '../../../libs.tests/chai.commons';
import { SendEmailSESParamsFactory } from '../../../factories/ses.factory';
import MessageError from '../../../../lib/ses/utils/message.errors';

describe('SES: send email', () => {
  let sesSendEmailStub: sinon.SinonStub<any, any>;

  beforeEach(() => {
    sesSendEmailStub = sinon.stub(ses, 'sendEmail');
  });

  afterEach(() => {
    sesSendEmailStub.restore();
  });

  it('[SUCCESS] should return the message id', async () => {
    const sendEmailParams = SendEmailSESParamsFactory();
    const messageId = 'some-message-id';
    sesSendEmailStub.returns({
      promise: () => {
        return { messageId };
      },
    });
    const result = await sendEmail(sendEmailParams);
    expect(sesSendEmailStub).to.have.been.calledOnce;
    expect(result).to.be.deep.equal({ messageId });
  });

  it('[ERROR] should return error when subject is undefined', async () => {
    try {
      const sendEmailParams = SendEmailSESParamsFactory({
        subject: undefined,
      });
      await sendEmail(sendEmailParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.sendEmail.name);
      expect(error.message).to.equal(MessageError.sendEmail.messages.subject);
    }
  });

  it('[ERROR] should return error when sender is undefined', async () => {
    try {
      const sendEmailParams = SendEmailSESParamsFactory({
        from: undefined,
      });
      await sendEmail(sendEmailParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.sendEmail.name);
      expect(error.message).to.equal(MessageError.sendEmail.messages.from);
    }
  });

  it('[ERROR] should return error when receiver are undefined', async () => {
    try {
      const sendEmailParams = SendEmailSESParamsFactory({
        to: undefined,
      });
      await sendEmail(sendEmailParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.sendEmail.name);
      expect(error.message).to.equal(MessageError.sendEmail.messages.to);
    }
  });
});
