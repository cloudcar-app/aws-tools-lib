import { S3 } from 'aws-sdk';
import { UploadS3Params } from './types';
import CloudcarError from '../errors/index';
import MessageError from '../message.errors';

const s3Client = process.env.LOCAL
  ? new S3({
      s3ForcePathStyle: true,
      accessKeyId: 'S3RVER', // This specific key is required when working offline
      secretAccessKey: 'S3RVER',
      endpoint: 'http://localhost:4569',
    })
  : new S3();

export const uploadItem = async (params: UploadS3Params): Promise<Object> => {
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

  const result = await s3Client.upload(params as S3.PutObjectRequest).promise();

  if (result.ETag === undefined || result.Location === undefined) {
    throw new CloudcarError({
      message: MessageError.uploadItem.messages.notFoundItem,
      name: MessageError.uploadItem.name,
    });
  }
  return result;
};
