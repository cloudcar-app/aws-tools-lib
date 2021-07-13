const MessageError = {
  sendEmail: {
    name: 'EMAIL_SERVICE_SEND_EMAIL_ERROR',
    messages: {
      from: 'undefined email sender',
      receiver: 'undefined email receiver',
      subject: 'undefined email subject',
    },
  },
  sendRawEmail: {
    name: 'EMAIL_SERVICE_SEND__RAW_EMAIL_ERROR',
    messages: {
      from: 'undefined email sender',
      receiver: 'undefined email receiver',
      subject: 'undefined email subject',
      file: 'undefined attachment file name',
      doc: 'undefined doc buffer',
    },
  },
};

export default MessageError;
