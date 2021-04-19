interface SendEmailSESparams {
  from: string;
  to: string[];
  subject: string;
  text?: string;
  htmlTemplate?: string;
  templateData?: object;
}

export { SendEmailSESparams };
