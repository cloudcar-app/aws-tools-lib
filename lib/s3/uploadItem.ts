import { PutObjectRequest } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import CloudcarError from '../errors/index';
import MessageError from './message.errors';
import { s3Client } from './utils/s3client';
/**
 * This method is to upload an item to s3. The user will be able to
 * download the item.
 */

export const uploadItem = async (params: PutObjectRequest): Promise<object> => {
  try {
    const { Bucket, Body } = params;
    if (Bucket === undefined) {
      throw new CloudcarError({
        message: MessageError.uploadItem.messages.bucketName,
        name: MessageError.uploadItem.name,
      });
    } else if (Body === undefined) {
      throw new CloudcarError({
        message: MessageError.uploadItem.messages.body,
        name: MessageError.uploadItem.name,
      });
    }

    const multipartUpload = new Upload({ client: s3Client, params });
    const result = await multipartUpload.done();

    if (result.$metadata.httpStatusCode !== 200) {
      throw new CloudcarError({
        message: MessageError.uploadItem.messages.notFoundItem,
        name: MessageError.uploadItem.name,
      });
    }
    return result;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
