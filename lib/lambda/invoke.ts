import { InvokeParams } from './types';
import CloudcarError from '../errors/index';
import MessageError from './message.errors';
import { InvokeCommand, LambdaClient } from '@aws-sdk/client-lambda';

export const invokeLambda = async (params: InvokeParams) => {
  const { FunctionName, InvocationType, Payload } = params;
  const lambda = new LambdaClient({});

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
  const input = { // InvocationRequest
    FunctionName,
    InvocationType,
    Payload,
  };

  const command = new InvokeCommand(lambdaParams);
  await lambda.send(command)
};
