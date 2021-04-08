interface SendEmailSESparams {
  from: string;
  to: string[];
  subject: string;
  text?: string;
  htmlTemplate?: string;
  templateData?: object;
}

interface SendEmailTemplatedSESparams {
  from: string;
  to: string[];
  templateData: string;
  template: string;
}

export { SendEmailSESparams, SendEmailTemplatedSESparams };
