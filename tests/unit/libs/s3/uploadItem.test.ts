/* eslint-disable @typescript-eslint/no-unused-expressions */
import { S3 } from 'aws-sdk';
import { uploadItem } from '../../../../lib/s3/uploadItem';
import { expect, sinon } from '../../../libs.tests/chai.commons';
import { UploadFileParamsFactory } from '../../../factories/s3.factory';
import ErrorTypes from '../../../../lib/errors/errorTypes';
import MessageError from '../../../../lib/message.errors';

describe('AWS-WRAPPER: uploadItem', () => {
  let s3Stub: sinon.SinonStub<any, any>;

  beforeEach(() => {
    s3Stub = sinon.stub(S3.prototype, 'upload');
  });

  afterEach(() => {
    s3Stub.restore();
  });

  it('[SUCCESS] should return the upload Item', async () => {
    const uploadItemParams = UploadFileParamsFactory();
    s3Stub.returns({
      promise: () => {
        return {
          Bucket: uploadItemParams.Bucket,
          ETag: 'Etag',
          Key: 'Key,',
          Location: '/some/path',
        };
      },
    });
    const values = (await uploadItem(
      uploadItemParams,
    )) as S3.ManagedUpload.SendData;
    expect(s3Stub).to.have.been.calledOnce;
    expect(values.Bucket).to.be.equal(uploadItemParams.Bucket);
    expect(values.ETag).to.exist;
  });

  it('[ERROR] should return fatal error when Bucket is undefined', async () => {
    try {
      const uploadItemParams = UploadFileParamsFactory({
        Bucket: undefined,
      });
      await uploadItem(uploadItemParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.uploadItem.name);
      expect(error.message).to.equal(
        MessageError.uploadItem.messages.bucketName,
      );
      expect(error.type).to.equal(ErrorTypes.FATAL);
    }
  });
  it('[ERROR] should return fatal error when body is undefined', async () => {
    try {
      const uploadItemParams = UploadFileParamsFactory({
        Body: undefined,
      });
      await uploadItem(uploadItemParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.uploadItem.name);
      expect(error.message).to.equal(MessageError.uploadItem.messages.body);
      expect(error.type).to.equal(ErrorTypes.FATAL);
    }
  });
});
