import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl as getSignedUrlS3 } from '@aws-sdk/s3-request-presigner';
import { ParamsPreSignedUrl } from './types';
import { s3Client } from './utils/s3client';

/**
 * This method is to get a signed url to download an item from s3.
 * The user will be able to download the item.
 * @param params
 * @returns
 */
export const getSignedUrl = async (
  params: ParamsPreSignedUrl,
): Promise<string> => {
  const command = new GetObjectCommand(params);
  const signedUrl = await getSignedUrlS3(s3Client, command);
  return signedUrl;
};
