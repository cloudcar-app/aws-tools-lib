import { define } from 'cooky-cutter';
import { CreateCognitoUser } from '../../lib/cognito/types';

export const CreateCognitoUserParamsFactory = define<CreateCognitoUser>({
  CognitoClientId: 'some-cognito-client-id',
  User: {
    name: 'Bob',
    email: 'bob@email.com',
  },
});
