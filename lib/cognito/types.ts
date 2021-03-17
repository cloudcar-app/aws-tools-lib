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
