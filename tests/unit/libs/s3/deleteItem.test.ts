/* eslint-disable @typescript-eslint/no-unused-expressions */
import { S3 } from 'aws-sdk';
import { deleteItem } from '../../../../lib/s3/deleteItem';
import { expect, sinon } from '../../../libs.tests/chai.commons';
import { DeleteS3ParamsFactory } from '../../../factories/s3.factory';
import ErrorTypes from '../../../../lib/errors/errorTypes';
import MessageError from '../../../../lib/message.errors';

describe.only('AWS-WRAPPER: deleteItem', () => {
  let s3Stub: sinon.SinonStub<any, any>;

  beforeEach(() => {
    s3Stub = sinon.stub(S3.prototype, 'deleteObject');
  });

  afterEach(() => {
    s3Stub.restore();
  });

  it('[SUCCESS]', async () => {
    const deleteItemParams = DeleteS3ParamsFactory();
    s3Stub.returns({
      promise: () => {
        return {
          Bucket: deleteItemParams.Bucket,
          Key: deleteItemParams.Key,
        };
      },
    });
    const values = (await deleteItem(
      deleteItemParams,
    )) as S3.ManagedUpload.SendData;
    expect(s3Stub).to.have.been.calledOnce;
    expect(values.Bucket).to.be.equal(deleteItemParams.Bucket);
    expect(values.ETag).to.exist;
  });

  it('[ERROR] should return fatal error when Bucket is undefined', async () => {
    try {
      const deleteItemParams = DeleteS3ParamsFactory({
        Bucket: undefined,
      });
      await deleteItem(deleteItemParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.deleteItem.name);
      expect(error.message).to.equal(
        MessageError.deleteItem.messages.bucketName,
      );
      expect(error.type).to.equal(ErrorTypes.FATAL);
    }
  });
  it('[ERROR] should return fatal error when key is undefined', async () => {
    try {
      const deleteItemParams = DeleteS3ParamsFactory({ Key: undefined });
      await deleteItem(deleteItemParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.deleteItem.name);
      expect(error.message).to.equal(MessageError.deleteItem.messages.key);
      expect(error.type).to.equal(ErrorTypes.FATAL);
    }
  });
});
