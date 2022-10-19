import { ses } from './utils/sesClient';
import MessageError from './utils/message.errors';
import { SendTemplatedEmailSESparams } from './types';
import CloudcarError from '../errors/index';

export const sendTemplatedEmail = async (
  params: SendTemplatedEmailSESparams,
) => {
  const { receiver, from, template, templateData } = params;

  if (receiver === undefined) {
    throw new CloudcarError({
      name: MessageError.sendEmail.name,
      message: MessageError.sendEmail.messages.receiver,
    });
  }

  if (from === undefined) {
    throw new CloudcarError({
      name: MessageError.sendEmail.name,
      message: MessageError.sendEmail.messages.from,
    });
  }

  const mailParams = {
    Destination: {
      ToAddresses: receiver,
    },
    Template: template,
    TemplateData: JSON.stringify(templateData),
    Source: from,
  };

  const result = await ses.sendTemplatedEmail(mailParams).promise();
  return result;
};
