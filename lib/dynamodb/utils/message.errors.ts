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
  deleteItem: {
    name: 'DATABASE_SERVICE_DELETE_ERROR',
    messages: {
      tableName: 'undefined table name',
      key: 'undefined keys',
    },
  },
  getItem: {
    name: 'DATABASE_SERVICE_GET_ERROR',
    messages: {
      tableName: 'undefined table name',
      undefinedResult: 'could not get the resource requested',
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
};

export default MessageError;
