// describe('COGNITO_SERVICE: create', () => {
//   it('[ERROR] should return banner error when username is undefined', async () => {
//     try {
//       const authParams = authParamsFactory({
//         username: undefined,
//       });
//       await authenticateUser(authParams);
//       throw new Error('should have throw an error');
//     } catch (error) {
//       expect(error.name).to.equal(MessageError.login.name);
//       expect(error.message).to.equal(MessageError.login.messages.username);
//       expect(error.type).to.equal(ErrorTypes.BANNER);
//     }
//   });
//   it('[ERROR] should return banner error when password is undefined', async () => {
//     try {
//       const authParams = authParamsFactory({
//         password: undefined,
//       });
//       await authenticateUser(authParams);
//       throw new Error('should have throw an error');
//     } catch (error) {
//       expect(error.name).to.equal(MessageError.login.name);
//       expect(error.message).to.equal(MessageError.login.messages.password);
//       expect(error.type).to.equal(ErrorTypes.BANNER);
//     }
//   });
//   it('[ERROR] should return banner error when pool id is undefined', async () => {
//     try {
//       const authParams = authParamsFactory({
//         userPoolId: undefined,
//       });
//       await authenticateUser(authParams);
//       throw new Error('should have throw an error');
//     } catch (error) {
//       expect(error.name).to.equal(MessageError.login.name);
//       expect(error.message).to.equal(MessageError.login.messages.poolId);
//       expect(error.type).to.equal(ErrorTypes.BANNER);
//     }
//   });
//   it('[ERROR] should return banner error when client id is undefined', async () => {
//     try {
//       const authParams = authParamsFactory({
//         clientId: undefined,
//       });
//       await authenticateUser(authParams);
//       throw new Error('should have throw an error');
//     } catch (error) {
//       expect(error.name).to.equal(MessageError.login.name);
//       expect(error.message).to.equal(MessageError.login.messages.clientId);
//       expect(error.type).to.equal(ErrorTypes.BANNER);
//     }
//   });
// });
