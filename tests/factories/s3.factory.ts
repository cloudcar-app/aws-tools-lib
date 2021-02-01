import { define } from 'cooky-cutter';

import { UploadS3Params, ACL } from '../../lib/s3/types';

export const UploadFileParamsFactory = define<UploadS3Params>({
  Bucket: 'some-bucket-name',
  Key: 'filename',
  Type: 'pdf',
  Body: 'some-file',
  ACL: ACL.Public_read,
});
