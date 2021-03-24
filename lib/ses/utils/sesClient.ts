import { SES } from 'aws-sdk';

export const ses = process.env.LOCAL
  ? new SES()
  : new SES({
      region: process.env.REGION || 'us-east-1',
    });
