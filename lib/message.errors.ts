const MessageError = {
  queryAtLeastOneItem: {
    name: 'DATABASE_SERVICE_QUERY_ERROR',
    messages: {
      tableName: 'undefined table name',
      notFoundItem: 'given params did not found items',
    },
  },
  createItem: {
    name: 'DATABASE_SERVICE_CREATE_ERROR',
    messages: {
      tableName: 'undefined table name',
      item: 'undefined item to create',
    },
  },
  getItem: {
    name: 'DATABASE_SERVICE_GET_ERROR',
    messages: {
      tableName: 'undefined table name',
      undefinedResult: 'could not get the resource requested',
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
      poolId: 'cognito client id is undefined',
      session: 'authentication result is invalid',
    },
  },
  updateItem: {
    name: 'DATABASE_SERVICE_UPDATE_ERROR',
    messages: {
      tableName: 'undefined table name',
      attributes: 'could not get new attributes from updated item',
      key: 'undefined table key',
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
  listItems: {
    name: 'DATABASE_SERVICE_LIST_ERROR',
    messages: {
      tableName: 'undefined table name',
    },
  },
  createUser: {
    name: 'COGNITO_SERVICE_CREATE_USER_ERROR',
    messages: {
      user: 'undefined user',
      clientId: 'undefined client Id',
      userConfirmed: '"The user wasn\'t confirmed"',
    },
  },
  createPurchaseIntent: {
    name: 'COGNITO_SERVICE_PURCHASE_INTENT_ERROR',
    messages: {
      apiKey: 'undefined apiKey',
      name: 'undefined name',
      ip: 'undefined ip',
      clientId: 'undefined client Id',
      session: 'there is un error creating the session',
      authResult: 'there is un error responding challenge',
    },
  },
};

export default MessageError;
