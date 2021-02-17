/* eslint-disable @typescript-eslint/no-unused-expressions */
// import { S3 } from 'aws-sdk';
// import { downloadItem } from '../../../../lib/s3/downloadItem';
// import { expect, sinon } from '../../../libs.tests/chai.commons';
// import { DownloadS3ParamsFactory } from '../../../factories/s3.factory';

// describe.only('AWS-WRAPPER: downloadItem', () => {
//   let s3Stub: sinon.SinonStub<any, any>;

//   beforeEach(() => {
//     s3Stub = sinon.stub(S3.prototype, 'getObject');
//   });

//   afterEach(() => {
//     s3Stub.restore();
//   });

//   it('[SUCCESS] should return the upload Item', async () => {
//     const downloadItemParams = DownloadS3ParamsFactory();
//     s3Stub.returns({
//       promise: () => {
//         return {
//           Body: Buffer.from('dummy'),
//         };
//       },
//     });
//     const values = (await downloadItem(
//       downloadItemParams,
//     )) as S3.GetObjectOutput;
//     const text = values.Body?.toString();
//     expect(s3Stub).to.have.been.calledOnce;
//     expect(text).to.be.equal('dummy');
//   });
// });
