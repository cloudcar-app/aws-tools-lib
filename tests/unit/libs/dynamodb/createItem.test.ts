/* eslint-disable @typescript-eslint/no-unused-expressions */
import { DynamoDB } from 'aws-sdk';
import { createItem } from '../../../../lib/dynamodb/createItem';
import { expect, sinon } from '../../../libs.tests/chai.commons';
import { PutDynamoParamsFactory } from '../../../factories/dynamodb.factory';
import ErrorTypes from '../../../../lib/errors/errorTypes';
import MessageError from '../../../../lib/dynamodb/utils/message.errors';

describe('AWS-WRAPPER: createItem', () => {
  let dynamoDBPutStub: sinon.SinonStub<any, any>;

  beforeEach(() => {
    dynamoDBPutStub = sinon.stub(DynamoDB.DocumentClient.prototype, 'put');
  });

  afterEach(() => {
    dynamoDBPutStub.restore();
  });

  it('[SUCCESS] should return the created Item', async () => {
    const createDynamoParams = PutDynamoParamsFactory();
    const { Item } = createDynamoParams;
    dynamoDBPutStub.returns({
      promise: () => {
        return { Item };
      },
    });
    const values = await createItem(createDynamoParams);
    expect(dynamoDBPutStub).to.have.been.calledOnce;
    expect(values).to.deep.keys(Item);
  });

  it('[ERROR] should return fatal error when tablename is undefined', async () => {
    try {
      const createDynamoParams = PutDynamoParamsFactory({
        TableName: undefined,
      });
      await createItem(createDynamoParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.createItem.name);
      expect(error.message).to.equal(
        MessageError.createItem.messages.tableName,
      );
      expect(error.type).to.equal(ErrorTypes.FATAL);
    }
  });
  it('[ERROR] should return fatal error when item is undefined', async () => {
    try {
      const createDynamoParams = PutDynamoParamsFactory({
        Item: undefined,
      });
      await createItem(createDynamoParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.createItem.name);
      expect(error.message).to.equal(MessageError.createItem.messages.item);
      expect(error.type).to.equal(ErrorTypes.FATAL);
    }
  });
});
