/* eslint-disable @typescript-eslint/no-unused-expressions */
import { DynamoDB } from 'aws-sdk';
import { updateItems } from '../../../../lib/dynamodb/updateItems';
import { expect, sinon } from '../../../libs.tests/chai.commons';
import {
  BatchUpdateDynamoParamsFactory,
  WrongBatchUpdateDynamoParamsFactory,
} from '../../../factories/dynamodb.factory';
import ErrorTypes from '../../../../lib/errors/errorTypes';
import MessageError from '../../../../lib/dynamodb/utils/message.errors';

describe('AWS-WRAPPER: updateItems', () => {
  let dynamoDBTransactWrite: sinon.SinonStub<any, any>;

  beforeEach(() => {
    dynamoDBTransactWrite = sinon.stub(
      DynamoDB.DocumentClient.prototype,
      'transactWrite',
    );
  });

  afterEach(() => {
    dynamoDBTransactWrite.restore();
  });

  it('[SUCCESS] should update the items', async () => {
    const updateDynamoParams = BatchUpdateDynamoParamsFactory();
    dynamoDBTransactWrite.returns({
      promise: () => {},
    });
    await updateItems(updateDynamoParams);
    expect(dynamoDBTransactWrite).to.have.been.calledOnce;
  });

  it('[ERROR] should return fatal error when tablename is undefined', async () => {
    try {
      const updateDynamoParams = BatchUpdateDynamoParamsFactory({
        TableName: undefined,
      });
      await updateItems(updateDynamoParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.updateItems.name);
      expect(error.message).to.equal(
        MessageError.updateItems.messages.tableName,
      );
      expect(error.type).to.equal(ErrorTypes.FATAL);
    }
  });

  it('[ERROR] should return fatal error when method is different from put', async () => {
    try {
      const updateDynamoParams = WrongBatchUpdateDynamoParamsFactory();
      await updateItems(updateDynamoParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.updateItems.name);
      expect(error.message).to.equal(MessageError.updateItems.messages.update);
      expect(error.type).to.equal(ErrorTypes.FATAL);
    }
  });
});
