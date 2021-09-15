import { dynamo } from './utils/dynamoClient';
/**
 * This method is when you need to make PartiQl Query
 * @param query You need a PartiQl statement to query
 * @returns result
 */
export const statement = async (query: string): Promise<Object> => {
  const result = await dynamo.executeStatement({ Statement: query }).promise();
  return result;
};
