interface SendEmailSESparams {
  from?: string;
  to: string[];
  subject: string;
  text?: string;
  htmlTemplate?: string;
  templateData?: object;
}

interface SendRawEmailSESparams {
  from?: string;
  to: string;
  subject: string;
  text?: string;
  htmlTemplate?: string;
  templateData?: object;
  doc: Buffer;
  filename: string;
}
export { SendEmailSESparams, SendRawEmailSESparams };
