const MessageError = {
  queryAtLeastOneItem: {
    name: 'DATABASE_SERVICE_QUERY_AT_LEAST_ONE_ITEM_ERROR',
    messages: {
      tableName: 'undefined table name',
      notFoundItem: 'given params did not found items',
    },
  },
  queryItems: {
    name: 'DATABASE_SERVICE_QUERY_ERROR',
    messages: {
      tableName: 'undefined table name',
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
  deleteItem: {
    name: 'DATABASE_SERVICE_DELETE_ERROR',
    messages: {
      tableName: 'undefined table name',
      key: 'undefined keys',
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
  listItems: {
    name: 'DATABASE_SERVICE_LIST_ERROR',
    messages: {
      tableName: 'undefined table name',
    },
  },
  createItems: {
    name: 'DATABASE_SERVICE_BATCH_WRITE_ERROR',
    messages: {
      itemsToWrite: 'undefined items to write',
      tableName: 'undefined table name',
      tableKey: 'undefined table key',
    },
  },
  generateConditionExpression: {
    name: 'DATABASE_SERVICE_CONDITION_EXPRESSION',
    messages: {
      invalidFunctionType: 'invalid condition expression type',
      invalidArgumentsNumber:
        'invalid number of arguments for condition expression type',
    },
  },
};

export default MessageError;
