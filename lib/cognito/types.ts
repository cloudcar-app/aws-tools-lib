// const params = {
//   CognitoClientId: process.env.CONCESSIONAIRE_COGNITO_CLIENT_ID,
//   concessionaire,
// };

export interface CreateCognitoUser {
  CognitoClientId?: string;
  User?: User;
  Metadata?: object;
}

interface User {
  name: string;
  email: string;
  customAttribute?: [CustomAttribute];
}

interface CustomAttribute {
  name: string;
  value: string;
}
