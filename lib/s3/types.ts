export interface UploadS3Params {
  Bucket?: string;
  Key?: string;
  Type?: string;
  Body?: Buffer | Uint8Array | string;
  ACL?: ACL;
}

export interface DownloadS3Params {
  Bucket?: string;
  Key?: string;
}

export enum ACL {
  Private = 'private',
  Public_read = 'public_read',
  Public_read_write = 'public_read_write',
  AWS_exec_read = 'aws_exec_read',
  Authenticated_read = 'authenticated_read',
  Bucket_owner_read = 'bucket_owner_read',
  Bucket_owner_full_control = 'bucket_owner_full_control',
  Log_delivery_write = 'log_delivery_write',
}
