import ErrorTypes from './errorTypes';

interface ErrorInput {
  message: string;
  name: string;
  type?: ErrorTypes;
}

class CloudcarError extends Error {
  type: string;

  constructor(errorInput: ErrorInput) {
    const { message, name, type } = errorInput;

    super(message);
    this.name = name;
    this.type = type || ErrorTypes.FATAL;
  }
}

export default CloudcarError;
