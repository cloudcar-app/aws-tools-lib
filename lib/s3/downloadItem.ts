import { GetObjectRequest } from '@aws-sdk/client-s3';
import { DownloadS3Params } from './types';
import CloudcarError from '../errors/index';
import MessageError from './message.errors';
import { s3Client } from './utils/s3client';

/**
 * Download an item from S3
 * @param params
 * @returns
 * @throws CloudcarError
 */

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

  const result = await s3Client.getObject(params as GetObjectRequest)

  return result;
};
