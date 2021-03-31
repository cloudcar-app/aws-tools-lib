/* eslint-disable max-len */
import { ses } from './utils/sesClient';
import MessageError from './utils/message.errors';
import { SendEmailTemplatedSESparams } from './types';
import CloudcarError from '../errors/index';

/**
 * send an email with a predefined template. return the email message id identifier. The message may not include more than 50 recipients, across the To:, CC: and BCC: fields. If you need to send an email message to a larger audience, you can divide your recipient list into groups of 50 or fewer, and then call the SendEmail operation several times to send the message to each group
 */
export const sendTemplatedEmail = async (
  params: SendEmailTemplatedSESparams,
) => {
  const { to, from, template, templateData } = params;

  if (to === undefined) {
    throw new CloudcarError({
      name: MessageError.sendTemplatedEmail.name,
      message: MessageError.sendTemplatedEmail.messages.to,
    });
  }

  if (from === undefined) {
    throw new CloudcarError({
      name: MessageError.sendTemplatedEmail.name,
      message: MessageError.sendTemplatedEmail.messages.from,
    });
  }

  if (template === undefined) {
    throw new CloudcarError({
      name: MessageError.sendTemplatedEmail.name,
      message: MessageError.sendTemplatedEmail.messages.template,
    });
  }

  if (templateData === undefined) {
    throw new CloudcarError({
      name: MessageError.sendTemplatedEmail.name,
      message: MessageError.sendTemplatedEmail.messages.templateData,
    });
  }

  const emailParams = {
    Source: from,
    Template: template,
    Destination: {
      ToAddresses: to,
    },
    TemplateData: templateData,
  };

  const result = await ses.sendTemplatedEmail(emailParams).promise();
  return result;
};
