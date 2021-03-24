/* eslint-disable @typescript-eslint/no-unused-expressions */
import { sendEmail } from '../../../../lib/SES/sendEmail';
import { expect } from '../../../libs.tests/chai.commons';
import { SendEmailSESParamsFactory } from '../../../factories/ses.factory';
import MessageError from '../../../../lib/ses/utils/message.errors';

describe('SES: send email', () => {
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

  it('[ERROR] should return error when text is undefined', async () => {
    try {
      const sendEmailParams = SendEmailSESParamsFactory({
        text: undefined,
      });
      await sendEmail(sendEmailParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.sendEmail.name);
      expect(error.message).to.equal(MessageError.sendEmail.messages.text);
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
