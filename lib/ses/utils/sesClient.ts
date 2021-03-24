import { SES } from 'aws-sdk';

export const ses = process.env.LOCAL
  ? new SES({ region: 'us-east-1', endpoint: 'http://localhost:9001' })
  : new SES({
      region: process.env.REGION || 'us-east-1',
    });
