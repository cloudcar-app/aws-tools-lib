import { DeleteS3Params } from './types';
import CloudcarError from '../errors/index';
import MessageError from './message.errors';
import { DeleteObjectRequest } from '@aws-sdk/client-s3';
import { s3Client } from './utils/s3client';

/**
 * Delete an item from S3
 * @param params
 * @returns
 * @throws CloudcarError
 * 
 **/

export const deleteItem = async (params: DeleteS3Params): Promise<Object> => {
  const { Bucket, Key } = params;
  if (Bucket === undefined) {
    throw new CloudcarError({
      message: MessageError.deleteItem.messages.bucketName,
      name: MessageError.deleteItem.name,
    });
  } else if (Key === undefined) {
    throw new CloudcarError({
      message: MessageError.deleteItem.messages.key,
      name: MessageError.deleteItem.name,
    });
  }
  const result = await s3Client.deleteObject(params as DeleteObjectRequest)
  return result;
};
