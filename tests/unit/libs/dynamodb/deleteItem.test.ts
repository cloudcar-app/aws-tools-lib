/* eslint-disable @typescript-eslint/no-unused-expressions */
import { DynamoDB } from 'aws-sdk';
import { deleteItem } from '../../../../lib/dynamodb/deleteItem';
import { expect, sinon } from '../../../libs.tests/chai.commons';
import { DeleteDynamoParamsFactory } from '../../../factories/dynamodb.factory';
import ErrorTypes from '../../../../lib/errors/errorTypes';
import MessageError from '../../../../lib/dynamodb/utils/message.errors';

describe('AWS-WRAPPER: deleteItem', () => {
  let dynamoDBDeleteStub: sinon.SinonStub<any, any>;

  beforeEach(() => {
    dynamoDBDeleteStub = sinon.stub(
      DynamoDB.DocumentClient.prototype,
      'delete',
    );
  });

  afterEach(() => {
    dynamoDBDeleteStub.restore();
  });

  it('[SUCCESS] should delete the Item', async () => {
    const deleteItemDynamoParams = DeleteDynamoParamsFactory();
    dynamoDBDeleteStub.returns({
      promise: () => {
        return null;
      },
    });
    await deleteItem(deleteItemDynamoParams);
    expect(dynamoDBDeleteStub).to.have.been.calledOnce;
  });

  it('[ERROR] should return fatal error when tablename is undefined', async () => {
    try {
      const deleteItemDynamoParams = DeleteDynamoParamsFactory({
        TableName: undefined,
      });
      await deleteItem(deleteItemDynamoParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.deleteItem.name);
      expect(error.message).to.equal(
        MessageError.deleteItem.messages.tableName,
      );
      expect(error.type).to.equal(ErrorTypes.FATAL);
    }
  });

  it('[ERROR] should return fatal error when key is undefined', async () => {
    try {
      const deleteItemDynamoParams = DeleteDynamoParamsFactory({
        Key: undefined,
      });
      await deleteItem(deleteItemDynamoParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.deleteItem.name);
      expect(error.message).to.equal(MessageError.deleteItem.messages.key);
      expect(error.type).to.equal(ErrorTypes.FATAL);
    }
  });
});
