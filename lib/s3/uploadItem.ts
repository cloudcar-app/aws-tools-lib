import { S3 } from 'aws-sdk';
import CloudcarError from '../errors/index';
import MessageError from './message.errors';

const s3Client = process.env.LOCAL
  ? new S3({
      s3ForcePathStyle: true,
      accessKeyId: 'S3RVER', // This specific key is required when working offline
      secretAccessKey: 'S3RVER',
      endpoint: 'http://localhost:4569',
    })
  : new S3({ region: process.env.REGION || 'us-east-1' });

export const uploadItem = async (
  params: S3.PutObjectRequest,
): Promise<S3.ManagedUpload.SendData> => {
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

    const result = await s3Client.upload(params).promise();

    if (result.ETag === undefined || result.Location === undefined) {
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
