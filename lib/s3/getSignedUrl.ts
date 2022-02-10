import { S3 } from 'aws-sdk';
import { ParamsPreSignedUrl } from './types';

const s3Client = process.env.LOCAL
  ? new S3({
      s3ForcePathStyle: true,
      accessKeyId: 'S3RVER', // This specific key is required when working offline
      secretAccessKey: 'S3RVER',
      endpoint: 'http://localhost:4569',
    })
  : new S3({ region: process.env.REGION || 'us-east-1' });

export const getSignedUrl = async (
  operation: string,
  params: ParamsPreSignedUrl,
): Promise<string> => {
  const signedUrl = await s3Client.getSignedUrlPromise(operation, params);
  return signedUrl;
};
