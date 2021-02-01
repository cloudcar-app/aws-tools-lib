export interface UploadS3Params {
  Bucket?: string;
  Key?: string;
  Type?: string;
  Body?: Buffer | Uint8Array | string;
  ACL?: 'public-read';
}
