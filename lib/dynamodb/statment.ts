import { dynamo } from './utils/dynamoClient';
import CloudcarError from '../errors/index';
import MessageError from './utils/message.errors';
import { unmarshall } from '@aws-sdk/util-dynamodb';
/**
 * This method is when you need to make PartiQl Query
 * @param query The query statement in PartiQL
 * @returns result
 */
export const statement = async (query: string): Promise<Object[]> => {
  if (!query) {
    throw new CloudcarError({
      name: MessageError.statement.name,
      message: MessageError.statement.messages.query,
    });
  }
  const result = await dynamo.executeStatement({ Statement: query });
  if (result.Items) {
    return result.Items.map((item) => unmarshall(item));
  }
  return [];
};
