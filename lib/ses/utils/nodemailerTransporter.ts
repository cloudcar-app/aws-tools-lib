import { createTransport } from 'nodemailer';
import { ses } from './sesClient';
import * as aws from '@aws-sdk/client-ses';

export const nodemailerTransporter = createTransport({
  SES: {
    ses,
    aws,
  },
});
