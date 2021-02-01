// const params = {
//   CognitoClientId: process.env.CONCESSIONAIRE_COGNITO_CLIENT_ID,
//   concessionaire,
// };

export interface CreateCognitoUser {
  CognitoClientId?: string;
  User?: User;
  Metadata?: object;
}

export interface AuthParams {
  username: string;
  flow?: AUTHFLOW;
  password?: string;
  CognitoClientId?: string;
  CognitoUserPoolId?: string;
}

enum AUTHFLOW {
  Admin_password_auth = 'ADMIN_USER_PASSWORD_AUTH',
  Custom_auth = 'CUSTOM_AUTH',
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
