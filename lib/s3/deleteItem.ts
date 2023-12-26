import { DeleteObjectCommandInput, S3 } from '@aws-sdk/client-s3';
import { DeleteS3Params } from './types';
import CloudcarError from '../errors/index';
import MessageError from './message.errors';

const s3Client = process.env.LOCAL
  ? new S3({
      forcePathStyle: true,
      credentials: {
        accessKeyId: 'S3RVER', // This specific key is required when working offline
        secretAccessKey: 'S3RVER',
      },
      endpoint: 'http://localhost:4569',
    })
  : new S3({
      region: process.env.REGION || 'us-east-1',
    });

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

  const result = await s3Client.deleteObject(
    params as DeleteObjectCommandInput,
  );

  return result;
};
