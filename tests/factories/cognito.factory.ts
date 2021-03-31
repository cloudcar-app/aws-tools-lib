import { define } from 'cooky-cutter';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import {
  CreateCognitoUser,
  AuthParams,
  UsernameParams,
  UpdateUserParams,
  AdminUpdateUserParams,
  GetUserParams,
} from '../../lib/cognito/types';

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

export const UsernameParamsFactory = define<UsernameParams>({
  Username: 'some-username',
  UserPoolId: 'some-pool-id',
});

export const AdminUpdateUserParamsFactory = define<AdminUpdateUserParams>({
  Username: 'some-username',
  UserPoolId: 'some-pool-id',
  UserAttributes: [{ Name: 'some-name', Value: 'some-value' }],
});

export const UpdateUserParamsFactory = define<UpdateUserParams>({
  AccessToken: 'some-access-token',
  UserAttributes: [{ Name: 'some-name', Value: 'some-value' }],
});

export const RefreshTokensParamsFactory = define<AuthParams>({
  CognitoClientId: 'some-cognito-client-id',
  flow: 'REFRESH_TOKEN_AUTH',
  CognitoUserPoolId: 'some-cognito-user-pool-id',
  refreshToken: 'some-refresh-token',
});

export const AuthenticationResultFactory = define<CognitoIdentityServiceProvider.Types.AdminInitiateAuthResponse>({
  AuthenticationResult: {
    AccessToken: 'some-access-token',
    IdToken: 'some-id-token',
    RefreshToken: 'some-refresh-token',
  },
});

export const GetUserResultFactory = define<CognitoIdentityServiceProvider.GetUserResponse>({
  Username: 'some-username',
  UserAttributes: [
    { Name: 'name', Value: 'some-name' },
    { Name: 'email', Value: 'some-email' },
    { Name: 'custom:concessionaireId', Value: 'some-concessionaireId' },
    { Name: 'custom:role', Value: 'some-role' },
  ],
});

export const GetUserParamsFactory = define<GetUserParams>({
  AccessToken: 'some-access-token',
  attributesToGet: ['name', 'email', 'custom:role', 'custom:concessionaireId'],
});

export const User = define({
  name: 'some-name',
  email: 'some-email',
  concessionaireId: 'some-concessionaireId',
  role: 'some-role',
  username: 'some-username',
});
