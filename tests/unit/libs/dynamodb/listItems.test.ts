/* eslint-disable @typescript-eslint/no-unused-expressions */
import { DynamoDB } from 'aws-sdk';
import { listItems } from '../../../../lib/dynamodb/listItems';
import { expect, sinon } from '../../../libs.tests/chai.commons';
import { ScanDynamoParamsFactory } from '../../../factories/dynamodb.factory';
import ErrorTypes from '../../../../lib/errors/errorTypes';
import MessageError from '../../../../lib/dynamodb/utils/message.errors';

describe('AWS-WRAPPER: listItems', () => {
  let dynamoDBScanStub: sinon.SinonStub<any, any>;

  beforeEach(() => {
    dynamoDBScanStub = sinon.stub(DynamoDB.DocumentClient.prototype, 'scan');
  });

  afterEach(() => {
    dynamoDBScanStub.restore();
  });

  it('[SUCCESS] should return the result.Items when is not undefined', async () => {
    const scanDynamoParams = ScanDynamoParamsFactory();
    const expectedValues = [1, 2];
    dynamoDBScanStub.returns({
      promise: () => {
        return { Items: [1, 2] };
      },
    });
    const values = await listItems(scanDynamoParams);
    expect(dynamoDBScanStub).to.have.been.called;
    expect(values).to.deep.equal(expectedValues);
  });

  it('[SUCCESS] should return empty array when result.Items is undefined', async () => {
    const scanDynamoParams = ScanDynamoParamsFactory();
    dynamoDBScanStub.returns({
      promise: () => {
        return { Items: undefined };
      },
    });
    const values = await listItems(scanDynamoParams);
    expect(dynamoDBScanStub).to.have.been.called;
    expect(values).to.deep.equal([]);
  });

  it('[ERROR] should return fatal error when tablename is undefined', async () => {
    try {
      const scanDynamoParams = ScanDynamoParamsFactory({
        TableName: undefined,
      });
      await listItems(scanDynamoParams);
      throw new Error('should have throw an error');
    } catch (error) {
      expect(error.name).to.equal(MessageError.listItems.name);
      expect(error.message).to.equal(MessageError.listItems.messages.tableName);
      expect(error.type).to.equal(ErrorTypes.FATAL);
    }
  });
});
