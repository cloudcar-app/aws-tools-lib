import { createTransport } from 'nodemailer';
import { ses } from './sesClient';

export const nodemailerTransporter = createTransport({
  SES: ses,
});
