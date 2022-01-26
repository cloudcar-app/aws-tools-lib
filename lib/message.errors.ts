const MessageError = {
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
  deleteItem: {
    name: 'STORAGE_SERVICE_DELETE_ERROR',
    messages: {
      bucketName: 'undefined bucket name',
      key: 'undefined body',
      notFoundItem: 'given params did not found items',
    },
  },
};

export default MessageError;
