interface SendEmailSESparams {
  from?: string;
  receiver: string[];
  subject: string;
  text?: string;
  htmlTemplate?: string;
  templateData?: object;
}

interface SendRawEmailSESparams {
  from?: string;
  receiver: string;
  subject: string;
  text?: string;
  htmlTemplate?: string;
  templateData?: object;
  doc: Buffer;
  filename: string;
}
export { SendEmailSESparams, SendRawEmailSESparams };
