/* eslint-disable max-len */
import { nodemailerTransporter } from './utils/nodemailerTransporter';
import MessageError from './utils/message.errors';
import { SendRawEmailSESparams } from './types';
import CloudcarError from '../errors/index';
import formatHtml from './utils/format-html';

/**
 * return the email message id identifier. The message may not include more than 50 recipients, across the To:, CC: and BCC: fields. If you need to send an email message to a larger audience, you can divide your recipient list into groups of 50 or fewer, and then call the SendEmail operation several times to send the message to each group
 */
export const sendRawEmail = async (params: SendRawEmailSESparams) => {
  const {
    receiver,
    from,
    subject,
    text,
    templateData,
    doc,
    filename,
    ccAddresses,
  } = params;

  let { htmlTemplate } = params;
  let body;

  if (receiver === undefined) {
    throw new CloudcarError({
      name: MessageError.sendRawEmail.name,
      message: MessageError.sendRawEmail.messages.receiver,
    });
  }

  if (filename === undefined) {
    throw new CloudcarError({
      name: MessageError.sendRawEmail.name,
      message: MessageError.sendRawEmail.messages.from,
    });
  }

  if (from === undefined) {
    throw new CloudcarError({
      name: MessageError.sendRawEmail.name,
      message: MessageError.sendRawEmail.messages.from,
    });
  }

  if (subject === undefined) {
    throw new CloudcarError({
      name: MessageError.sendRawEmail.name,
      message: MessageError.sendRawEmail.messages.subject,
    });
  }

  if (htmlTemplate && templateData) {
    htmlTemplate = formatHtml(htmlTemplate, templateData);
  }

  if (!htmlTemplate) {
    body = text;
  } else {
    body = htmlTemplate;
  }

  const mailOptions = {
    from,
    subject,
    html: body,
    to: receiver,
    cc: ccAddresses,
    attachments: [
      {
        filename,
        content: doc,
      },
    ],
  };
  await nodemailerTransporter.sendMail(mailOptions);
};
