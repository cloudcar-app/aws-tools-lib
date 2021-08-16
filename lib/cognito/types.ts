export interface CreateCognitoUser {
  CognitoClientId?: string;
  User?: User;
  Metadata?: object;
}

export interface AuthParams {
  username?: string;
  flow?: 'CUSTOM_AUTH' | 'ADMIN_USER_PASSWORD_AUTH' | 'REFRESH_TOKEN_AUTH';
  password?: string;
  CognitoClientId?: string;
  CognitoUserPoolId?: string;
  Answer?: string;
  refreshToken?: string;
}

interface User {
  password?: string;
  name: string;
  email: string;
  customAttribute?: CustomAttribute[];
}

interface CustomAttribute {
  name: string;
  value: string;
}

export interface PurchaseIntentParams {
  Ip: string;
  Name: string;
  APIKEY: string;
  CognitoClientId: string;
}

export interface ListUsersParams {
  AttributesToGet?: string[];
  Filter?: string;
  Limit?: number;
  PaginationToken?: string;
  UserPoolId: string;
}

export interface UsernameParams {
  Username: string;
  UserPoolId: string;
}

export interface CognitoUser {
  username?: string;
  enabled?: boolean;
}

export interface AttributeType {
  Name: string;
  Value?: string;
}

export interface AdminUpdateUserParams {
  Username: string;
  UserPoolId: string;
  UserAttributes: AttributeType[];
}

export interface UpdateUserParams {
  AccessToken: string;
  UserAttributes: AttributeType[];
}

export interface GetUserParams {
  attributesToGet: string[];
  AccessToken: string;
}

export interface ConfirmUserEmail {
  Username: string;
  ClientId: string;
  ConfirmationCode: string;
}
