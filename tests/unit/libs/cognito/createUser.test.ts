// /* eslint-disable @typescript-eslint/no-unused-expressions */
// // import { CognitoIdentityServiceProvider } from 'aws-sdk';
// import * as aws from 'aws-sdk';
// import { createUser } from '../../../../lib/cognito/createUser';
// import { expect, sinon } from '../../../libs.tests/chai.commons';
// import { CreateCognitoUserParamsFactory } from '../../../factories/cognito.factory';
// // import ErrorTypes from '../../../../lib/errors/errorTypes';
// // import MessageError from '../../../../lib/message.errors';

// describe('AWS-WRAPPER: createUser', () => {
//   const sandbox = sinon.createSandbox();

//   const awsStub = sandbox.stub(aws, 'CognitoIdentityServiceProvider').returns({
//     signUp() {
//       return {
//         promise() {
//           return {
//             Items: [],
//           };
//         },
//       };
//     },
//   });
//   // let CognitoSignUpStub: sinon.SinonStub<any, any>;

//   beforeEach(() => {
//     // CognitoSignUpStub = sinon.stub(
//     //   CognitoIdentityServiceProvider.prototype,
//     //   'signUp',
//     // );
//   });

//   afterEach(() => {
//     // CognitoSignUpStub.restore();
//   });

//   it.only('[SUCCESS] should return the created Item', async () => {
//     const createCognitoParams = CreateCognitoUserParamsFactory();
//     const { User } = createCognitoParams;
//     // CognitoSignUpStub.returns({
//     //   promise: () => {
//     //     return { User };
//     //   },
//     // });
//     const values = await createUser(createCognitoParams);
//     expect(awsStub).to.have.been.calledOnce;
//     expect(values).to.deep.equal(User);
//   });

//   // it('[ERROR] should return fatal error when tablename is undefined', async () => {
//   //   try {
//   //     const createDynamoParams = PutDynamoParamsFactory({
//   //       TableName: undefined,
//   //     });
//   //     await createItem(createDynamoParams);
//   //     throw new Error('should have throw an error');
//   //   } catch (error) {
//   //     expect(error.name).to.equal(MessageError.createItem.name);
//   //     expect(error.message).to.equal(
//   //       MessageError.createItem.messages.tableName,
//   //     );
//   //     expect(error.type).to.equal(ErrorTypes.FATAL);
//   //   }
//   // });
//   // it('[ERROR] should return fatal error when item is undefined', async () => {
//   //   try {
//   //     const createDynamoParams = PutDynamoParamsFactory({
//   //       Item: undefined,
//   //     });
//   //     await createItem(createDynamoParams);
//   //     throw new Error('should have throw an error');
//   //   } catch (error) {
//   //     expect(error.name).to.equal(MessageError.createItem.name);
//   //     expect(error.message).to.equal(MessageError.createItem.messages.item);
//   //     expect(error.type).to.equal(ErrorTypes.FATAL);
//   //   }
//   // });
// });
