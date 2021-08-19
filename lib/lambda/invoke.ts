import { Lambda } from 'aws-sdk';
import { InvokeParams } from './types';
import CloudcarError from '../errors/index';
import MessageError from './message.errors';

export const invokeLambda = (params: InvokeParams) => {
  const { FunctionName, InvocationType, Payload } = params;
  const lambda = new Lambda();

  if (!FunctionName) {
    throw new CloudcarError({
      message: MessageError.invoke.messages.functionName,
      name: MessageError.invoke.name,
    });
  }
  if (!InvocationType) {
    throw new CloudcarError({
      message: MessageError.invoke.messages.invocationType,
      name: MessageError.invoke.name,
    });
  }
  if (!Payload) {
    throw new CloudcarError({
      message: MessageError.invoke.messages.payload,
      name: MessageError.invoke.name,
    });
  }

  const lambdaParams = {
    InvocationType,
    FunctionName,
    Payload,
  };

  lambda.invoke(lambdaParams).promise();
};
