import { S3 } from 'aws-sdk';
import { DownloadS3Params } from './types';
import CloudcarError from '../errors/index';
import MessageError from '../message.errors';

const s3Client = process.env.LOCAL
  ? new S3({
      s3ForcePathStyle: true,
      accessKeyId: 'S3RVER',
      secretAccessKey: 'S3RVER',
      endpoint: 'http://localhost:4569',
    })
  : new S3();

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

  const result = await s3Client
    .getObject(params as S3.GetObjectRequest)
    .promise();

  return result;
};
