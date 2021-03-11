/* eslint-disable @typescript-eslint/no-unused-expressions */
import { DynamoDB } from 'aws-sdk';
import { queryItems } from '../../../../lib/dynamodb/queryItems';
import { expect, sinon } from '../../../libs.tests/chai.commons';
import { QueryParamsFactory } from '../../../factories/dynamodb.factory';
import ErrorTypes from '../../../../lib/errors/errorTypes';
import MessageError from '../../../../lib/message.errors';

describe('AWS-WRAPPER: queryItems', () => {
  let dynamoDBQueryStub: sinon.SinonStub<any, any>;

  beforeEach(() => {
    dynamoDBQueryStub = sinon.stub(DynamoDB.DocumentClient.prototype, 'query');
  });

  afterEach(() => {
    dynamoDBQueryStub.restore();
  });

  it('[SUCCESS]', async () => {
    const queryDynamoParams = QueryParamsFactory();
    const expectedItem = [{ value: 'some-value' }];
    const queryResult = { Items: expectedItem };
    dynamoDBQueryStub.returns({
      promise: () => {
        return queryResult;
      },
    });
    const expectedQueryResult = await queryItems(queryDynamoParams);
    expect(dynamoDBQueryStub).to.have.been.calledOnce;
    expect(expectedQueryResult).to.deep.equal(queryResult);
  });

  it('[ERROR] should throw fatal error when tablename is undefined', async () => {
    try {
      const queryDynamoParams = QueryParamsFactory({
        TableName: undefined,
      });
      await queryItems(queryDynamoParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.queryItems.name);
      expect(error.message).to.equal(
        MessageError.queryItems.messages.tableName,
      );
      expect(error.type).to.equal(ErrorTypes.FATAL);
    }
  });
});
