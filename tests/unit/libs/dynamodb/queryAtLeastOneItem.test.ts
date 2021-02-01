/* eslint-disable @typescript-eslint/no-unused-expressions */
import { DynamoDB } from 'aws-sdk';
import { queryAtLeastOneItem } from '../../../../lib/dynamodb/queryItems';
import { expect, sinon } from '../../../libs.tests/chai.commons';
import { QueryAtLeastOneItemParamsFactory } from '../../../factories/aws.factory';
import ErrorTypes from '../../../../lib/errors/errorTypes';
import MessageError from '../../../../lib/message.errors';

describe('AWS-WRAPPER: queryAtLeastOneItem', () => {
  let dynamoDBQueryStub: sinon.SinonStub<any, any>;

  beforeEach(() => {
    dynamoDBQueryStub = sinon.stub(DynamoDB.DocumentClient.prototype, 'query');
  });

  afterEach(() => {
    dynamoDBQueryStub.restore();
  });

  it('[SUCCESS]', async () => {
    const queryDynamoParams = QueryAtLeastOneItemParamsFactory();
    const expectedItem = [{ value: 'some-value' }];
    dynamoDBQueryStub.returns({
      promise: () => {
        return { Items: expectedItem };
      },
    });
    const item = await queryAtLeastOneItem(queryDynamoParams);
    expect(dynamoDBQueryStub).to.have.been.calledOnce;
    expect(item).to.deep.equal(expectedItem);
  });

  it('[ERROR] should throw fatal error when tablename is undefined', async () => {
    try {
      const queryDynamoParams = QueryAtLeastOneItemParamsFactory({
        TableName: undefined,
      });
      await queryAtLeastOneItem(queryDynamoParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.queryAtLeastOneItem.name);
      expect(error.message).to.equal(
        MessageError.queryAtLeastOneItem.messages.tableName,
      );
      expect(error.type).to.equal(ErrorTypes.FATAL);
    }
  });
  it('[ERROR] should throw fatal error when result is undefined', async () => {
    try {
      const queryDynamoParams = QueryAtLeastOneItemParamsFactory();
      dynamoDBQueryStub.returns({
        promise: () => {
          return { Items: undefined };
        },
      });
      await queryAtLeastOneItem(queryDynamoParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.queryAtLeastOneItem.name);
      expect(error.message).to.equal(
        MessageError.queryAtLeastOneItem.messages.notFoundItem,
      );
      expect(error.type).to.equal(ErrorTypes.FATAL);
    }
  });
  it('[ERROR] should throw fatal error when result is empty', async () => {
    try {
      const queryDynamoParams = QueryAtLeastOneItemParamsFactory();
      dynamoDBQueryStub.returns({
        promise: () => {
          return { Items: [] };
        },
      });
      await queryAtLeastOneItem(queryDynamoParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.queryAtLeastOneItem.name);
      expect(error.message).to.equal(
        MessageError.queryAtLeastOneItem.messages.notFoundItem,
      );
      expect(error.type).to.equal(ErrorTypes.FATAL);
    }
  });
});
