// /* eslint-disable @typescript-eslint/no-unused-expressions */
// import { CognitoIdentityServiceProvider } from 'aws-sdk';

// import { authenticateWithPassword } from '../../../../lib/cognito/authenticateWithPassword';
// import { expect, sinon } from '../../../libs.tests/chai.commons';
// import { AuthWithPasswordParamsFactory } from '../../../factories/cognito.factory';
// // import ErrorTypes from '../../../../lib/errors/errorTypes';
// // import MessageError from '../../../../lib/message.errors';

// describe('AWS-WRAPPER: createUser', () => {
//   let CognitoSignUpStub: sinon.SinonStub<any, any>;

//   beforeEach(() => {
//     CognitoSignUpStub = sinon.stub(
//       CognitoIdentityServiceProvider.prototype,
//       'adminInitiateAuth',
//     );
//   });

//   afterEach(() => {
//     CognitoSignUpStub.restore();
//   });

//   it.only('[SUCCESS] should return the created Item', async () => {
//     const authParams = AuthWithPasswordParamsFactory();
//     CognitoSignUpStub.returns({
//       promise: () => {
//         return { authParams };
//       },
//     });
//     await authenticateWithPassword(authParams);
//     expect(CognitoSignUpStub).to.have.been.calledOnce;
//     // expect(values).to.deep.equal(User);
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
