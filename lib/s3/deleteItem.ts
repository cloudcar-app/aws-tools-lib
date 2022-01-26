import { S3 } from 'aws-sdk';
import { DeleteS3Params } from './types';
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

  const result = await s3Client
    .deleteObject(params as S3.DeleteObjectRequest)
    .promise();

  return result;
};
