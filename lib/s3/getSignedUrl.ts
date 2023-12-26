import { GetObjectCommand, S3 } from '@aws-sdk/client-s3';
import { getSignedUrl as awsGetSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ParamsPreSignedUrl } from './types';

const s3Client = process.env.LOCAL
  ? new S3({
      forcePathStyle: true,
      credentials: {
        accessKeyId: 'S3RVER',
        secretAccessKey: 'S3RVER',
      },
      endpoint: 'http://localhost:4569',
    })
  : new S3({
      region: process.env.REGION || 'us-east-1',
    });

export const getSignedUrl = async (
  operation: string,
  params: ParamsPreSignedUrl,
): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: params.Bucket,
    Key: params.Key,
  });
  const signedUrl = await awsGetSignedUrl(s3Client, command, {
    expiresIn: params.Expires,
  });
  return signedUrl;
};
