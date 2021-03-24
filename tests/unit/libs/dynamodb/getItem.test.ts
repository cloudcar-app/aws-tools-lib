/* eslint-disable @typescript-eslint/no-unused-expressions */
import { DynamoDB } from 'aws-sdk';
import { getItem } from '../../../../lib/dynamodb/getItem';
import { expect, sinon } from '../../../libs.tests/chai.commons';
import { QueryParamsFactory } from '../../../factories/dynamodb.factory';
import ErrorTypes from '../../../../lib/errors/errorTypes';
import MessageError from '../../../../lib/dynamodb/utils/message.errors';

describe('AWS-WRAPPER: getItem', () => {
  let dynamoDBQueryStub: sinon.SinonStub<any, any>;

  beforeEach(() => {
    dynamoDBQueryStub = sinon.stub(DynamoDB.DocumentClient.prototype, 'query');
  });

  afterEach(() => {
    dynamoDBQueryStub.restore();
  });

  it('[SUCCESS] expect to return object when item exist', async () => {
    const queryDynamoParams = QueryParamsFactory();
    const expectedItem = { value: 'some-value' };
    dynamoDBQueryStub.returns({
      promise: () => {
        return { Items: [expectedItem] };
      },
    });
    const item = await getItem(queryDynamoParams);
    expect(dynamoDBQueryStub).to.have.been.calledOnce;
    expect(item).to.deep.equal(expectedItem);
  });

  it('[SUCCESS] expect to return null when item does not exist', async () => {
    const queryDynamoParams = QueryParamsFactory();
    dynamoDBQueryStub.returns({
      promise: () => {
        return { Items: [] };
      },
    });
    const item = await getItem(queryDynamoParams);
    expect(dynamoDBQueryStub).to.have.been.calledOnce;
    expect(item).to.equal(null);
  });

  it('[ERROR] should throw fatal error when tablename is undefined', async () => {
    try {
      const queryDynamoParams = QueryParamsFactory({
        TableName: undefined,
      });
      await getItem(queryDynamoParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.getItem.name);
      expect(error.message).to.equal(MessageError.getItem.messages.tableName);
      expect(error.type).to.equal(ErrorTypes.FATAL);
    }
  });
  it('[ERROR] should throw fatal error when items is undefined', async () => {
    try {
      const queryDynamoParams = QueryParamsFactory();
      dynamoDBQueryStub.returns({
        promise: () => {
          return {};
        },
      });
      await getItem(queryDynamoParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.getItem.name);
      expect(error.message).to.equal(
        MessageError.getItem.messages.undefinedResult,
      );
      expect(error.type).to.equal(ErrorTypes.FATAL);
    }
  });
});
