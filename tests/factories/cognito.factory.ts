import { define } from 'cooky-cutter';
import { CreateCognitoUser, AuthParams } from '../../lib/cognito/types';

export const CreateCognitoUserParamsFactory = define<CreateCognitoUser>({
  CognitoClientId: 'some-cognito-client-id',
  User: {
    name: 'Bob',
    email: 'bob@email.com',
  },
});
export const AuthWithPasswordParamsFactory = define<AuthParams>({
  CognitoClientId: 'some-cognito-client-id',
  username: 'Bob',
  password: 'password',
  CognitoUserPoolId: 'some-cognito-user-pool-id',
});
