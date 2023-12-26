import { InvocationType } from '@aws-sdk/client-lambda';

export interface InvokeParams {
  InvocationType: InvocationType;
  FunctionName?: string;
  Payload: string;
}
