import { S3 } from '@aws-sdk/client-s3';

export const s3Client = process.env.LOCAL
  ? new S3({
      forcePathStyle: true,
      credentials: {
        accessKeyId: 'S3RVER', // This specific key is required when working offline
        secretAccessKey: 'S3RVER',
      },
      endpoint: 'http://localhost:4569',
    })
  : new S3({ region: process.env.REGION || 'us-east-1' });
