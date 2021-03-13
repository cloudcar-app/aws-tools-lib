const MessageError = {
  listUsers: {
    name: 'COGNITO_SERVICE_LIST_USERS_ERROR',
    messages: {
      userPoolId: 'cognito pool user id is undefined',
    },
  },
  authentication: {
    name: 'COGNITO_SERVICE_AUTHENTICATION_ERROR',
    messages: {
      tokenUse: 'request use is not access',
      kid: 'claim made for unknown kid',
      header: 'request has no authorization header',
      iss: 'request issuer is invalid',
      signature: 'invalid signature',
      requestToken: 'request token is invalid',
      credentials: 'login credentials are invalid',
    },
  },
  login: {
    name: 'COGNITO_SERVICE_LOGIN_ERROR',
    messages: {
      username: 'username is undefined',
      password: 'password is undefined',
      clientId: 'cognito client id is undefined',
      poolId: 'cognito pool user id is undefined',
      session: 'authentication result is invalid',
    },
  },
  uploadItem: {
    name: 'STORAGE_SERVICE_UPLOAD_ERROR',
    messages: {
      bucketName: 'undefined bucket name',
      body: 'undefined body',
      notFoundItem: 'given params did not found items',
      key: 'undefined table key',
    },
  },
  downloadItem: {
    name: 'STORAGE_SERVICE_DOWNLOAD_ERROR',
    messages: {
      bucketName: 'undefined bucket name',
      key: 'undefined body',
      notFoundItem: 'given params did not found items',
    },
  },
  createUser: {
    name: 'COGNITO_SERVICE_CREATE_USER_ERROR',
    messages: {
      user: 'undefined user',
      clientId: 'cognito client id is undefined',
      userConfirmed: '"The user wasn\'t confirmed"',
    },
  },
  createPurchaseIntent: {
    name: 'COGNITO_SERVICE_PURCHASE_INTENT_ERROR',
    messages: {
      apiKey: 'undefined apiKey',
      name: 'undefined name',
      ip: 'undefined ip',
      clientId: 'cognito client id is undefined',
      session: 'there is un error creating the session',
      authResult: 'there is un error responding challenge',
    },
  },
  refreshTokens: {
    name: 'COGNITO_SERVICE_REFRESH_TOKENS_ERROR',
    messages: {
      refreshToken: 'refresh token is undefined',
      flow: 'auth flow is undefined',
      clientId: 'cognito client id is undefined',
      poolId: 'cognito user pool id is undefined',
      authResult: 'there was an error refreshing the tokens',
    },
  },
  deleteUser: {
    name: 'COGNITO_SERVICE_DELETE_USER_ERROR',
    messages: {
      username: 'username is undefined',
      poolId: 'cognito user pool id is undefined',
    },
  },
  disableUser: {
    name: 'COGNITO_SERVICE_DISABLE_USER_ERROR',
    messages: {
      username: 'username is undefined',
      poolId: 'cognito user pool id is undefined',
    },
  },
  enableUser: {
    name: 'COGNITO_SERVICE_ENABLE_USER_ERROR',
    messages: {
      username: 'username is undefined',
      poolId: 'cognito user pool id is undefined',
    },
  },
  updateUser: {
    name: 'COGNITO_SERVICE_UPDATE_USER_ERROR',
    messages: {
      username: 'username is undefined',
      poolId: 'cognito user pool id is undefined',
      userAttributes: 'user attributes are undefined',
    },
  },
};

export default MessageError;
