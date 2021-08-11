import { createTransport } from 'nodemailer';
import { ses } from './sesClient';

ses.createConfigurationSet({
  ConfigurationSet: {
    Name: 'templateFailure',
  },
});

export const nodemailerTransporter = createTransport({
  SES: ses,
});
