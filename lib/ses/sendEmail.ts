/* eslint-disable max-len */
import { ses } from './utils/sesClient';
import MessageError from './utils/message.errors';
import { SendEmailSESparams } from './types';
import CloudcarError from '../errors/index';
import formatHtml from './utils/format-html';

/**
 * return the email message id identifier. The message may not include more than 50 recipients, across the To:, CC: and BCC: fields. If you need to send an email message to a larger audience, you can divide your recipient list into groups of 50 or fewer, and then call the SendEmail operation several times to send the message to each group
 */
export const sendEmail = async (params: SendEmailSESparams) => {
  const { to, from, subject, text, templateData } = params;

  let { htmlTemplate } = params;

  if (to === undefined) {
    throw new CloudcarError({
      name: MessageError.sendEmail.name,
      message: MessageError.sendEmail.messages.to,
    });
  }

  if (from === undefined) {
    throw new CloudcarError({
      name: MessageError.sendEmail.name,
      message: MessageError.sendEmail.messages.from,
    });
  }

  if (subject === undefined) {
    throw new CloudcarError({
      name: MessageError.sendEmail.name,
      message: MessageError.sendEmail.messages.subject,
    });
  }

  if (text === undefined) {
    throw new CloudcarError({
      name: MessageError.sendEmail.name,
      message: MessageError.sendEmail.messages.text,
    });
  }

  if (templateData) {
    htmlTemplate = formatHtml(htmlTemplate, templateData);
  }

  const mailParams = {
    Destination: {
      ToAddresses: to,
    },
    Message: {
      Body: {
        Text: { Data: text },
        Html: { Data: htmlTemplate },
      },
      Subject: { Data: subject },
    },
    Source: from,
  };

  const result = await ses.sendEmail(mailParams).promise();
  return result;
};
