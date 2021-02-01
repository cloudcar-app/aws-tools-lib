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
  listItems: {
    name: 'DATABASE_SERVICE_LIST_ERROR',
    messages: {
      tableName: 'undefined table name',
    },
  },
  createCognitoConcessionaire: {
    name: 'COGNITO_SERVICE_CONCESSIONAIRE_ERROR',
    messages: {
      concessionaire: 'undefined concessionaire',
      clientId: 'undefined client Id',
      concessionaireConfirmed:
        '"undefined the concessionaire wasn\'t create on dynamoDB"',
    },
  },
};

export default MessageError;
