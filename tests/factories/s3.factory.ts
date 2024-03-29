import { define } from 'cooky-cutter';

import {
  UploadS3Params,
  ACL,
  DownloadS3Params,
  DeleteS3Params,
} from '../../lib/s3/types';

export const UploadFileParamsFactory = define<UploadS3Params>({
  Bucket: 'some-bucket-name',
  Key: 'filename',
  Type: 'pdf',
  Body: 'some-file',
  ACL: ACL.Public_read,
});

export const DownloadS3ParamsFactory = define<DownloadS3Params>({
  Bucket: 'some-bucket-name',
  Key: 'some-key',
});

export const DeleteS3ParamsFactory = define<DeleteS3Params>({
  Bucket: 'some-bucket-name',
  Key: 'some-key',
});
