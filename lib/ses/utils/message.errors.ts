const MessageError = {
  sendEmail: {
    name: 'EMAIL_SERVICE_SEND_EMAIL_ERROR',
    messages: {
      from: 'undefined email sender',
      to: 'undefined email receiver',
      subject: 'undefined email subject',
      text: 'undefined email text',
    },
  },
  sendTemplatedEmail: {
    name: 'EMAIL_SERVICE_SEND_TEMPLATED_EMAIL_ERROR',
    messages: {
      from: 'undefined email sender',
      to: 'undefined email receiver',
      template: 'undefined template name',
      templateData: 'undefined template data',
    },
  },
};

export default MessageError;
