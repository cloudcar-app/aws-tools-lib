import { ses } from './utils/sesClient';
import MessageError from './utils/message.errors';
import { SendEmailSESparams } from './types';
import CloudcarError from '../errors/index';

export const sendEmail = async (params: SendEmailSESparams) => {
  const { to, from, subject, text } = params;

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

  const mailParams = {
    Destination: {
      ToAddresses: to,
    },
    Message: {
      Body: {
        Text: { Data: text },
      },
      Subject: { Data: subject },
    },
    Source: from,
  };

  const result = await ses.sendEmail(mailParams).promise();
  return result;
};
