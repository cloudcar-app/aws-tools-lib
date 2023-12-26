import { GetObjectCommandInput, S3 } from '@aws-sdk/client-s3';
import { DownloadS3Params } from './types';
import CloudcarError from '../errors/index';
import MessageError from './message.errors';

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

export const downloadItem = async (
  params: DownloadS3Params,
): Promise<Object> => {
  const { Bucket, Key } = params;
  if (Bucket === undefined) {
    throw new CloudcarError({
      message: MessageError.downloadItem.messages.bucketName,
      name: MessageError.downloadItem.name,
    });
  } else if (Key === undefined) {
    throw new CloudcarError({
      message: MessageError.downloadItem.messages.key,
      name: MessageError.downloadItem.name,
    });
  }

  const result = await s3Client.getObject(params as GetObjectCommandInput);

  return result;
};
