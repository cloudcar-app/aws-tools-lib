/* eslint-disable @typescript-eslint/no-unused-expressions */
import { DynamoDB } from 'aws-sdk';
import { updateItem } from '../../../../lib/dynamodb/updateItem';
import { expect, sinon } from '../../../libs.tests/chai.commons';
import { UpdateDynamoParamsFactory } from '../../../factories/dynamodb.factory';
import ErrorTypes from '../../../../lib/errors/errorTypes';
import MessageError from '../../../../lib/message.errors';

describe('AWS-WRAPPER: updateItem', () => {
  let dynamoDBUpdateStub: sinon.SinonStub<any, any>;

  beforeEach(() => {
    dynamoDBUpdateStub = sinon.stub(
      DynamoDB.DocumentClient.prototype,
      'update',
    );
  });

  afterEach(() => {
    dynamoDBUpdateStub.restore();
  });

  it('[SUCCESS] should return the updated Item', async () => {
    const updateDynamoParams = UpdateDynamoParamsFactory();
    dynamoDBUpdateStub.returns({
      promise: () => {
        return { Attributes: updateDynamoParams };
      },
    });
    const values = await updateItem(updateDynamoParams);
    expect(dynamoDBUpdateStub).to.have.been.calledOnce;
    expect(values).to.deep.equal(updateDynamoParams);
  });

  it('[ERROR] should return fatal error when tablename is undefined', async () => {
    try {
      const updateDynamoParams = UpdateDynamoParamsFactory({
        TableName: undefined,
      });
      await updateItem(updateDynamoParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.updateItem.name);
      expect(error.message).to.equal(
        MessageError.updateItem.messages.tableName,
      );
      expect(error.type).to.equal(ErrorTypes.FATAL);
    }
  });
  it('[ERROR] should return fatal error when key is undefined', async () => {
    try {
      const updateDynamoParams = UpdateDynamoParamsFactory({
        Key: undefined,
      });
      await updateItem(updateDynamoParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.updateItem.name);
      expect(error.message).to.equal(MessageError.updateItem.messages.key);
      expect(error.type).to.equal(ErrorTypes.FATAL);
    }
  });
  it('[ERROR] should return fatal error when couldn not receive new item', async () => {
    try {
      const updateDynamoParams = UpdateDynamoParamsFactory();
      dynamoDBUpdateStub.returns({
        promise: () => {
          return { Attributes: undefined };
        },
      });
      await updateItem(updateDynamoParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.updateItem.name);
      expect(error.message).to.equal(
        MessageError.updateItem.messages.attributes,
      );
      expect(error.type).to.equal(ErrorTypes.FATAL);
    }
  });
});
