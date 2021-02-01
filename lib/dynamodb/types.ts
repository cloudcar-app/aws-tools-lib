interface QueryDynamoParams {
  TableName?: string;
  ConditionExpression?: string;
  Limit?: number;
}

interface PutDynamoParams {
  TableName?: string;
  Item: Object;
  ConditionExpression?: string;
}

interface UpdateDynamoParams {
  TableName?: string;
  Key?: object;
  Item: object;
}

interface ScanDynamoParams {
  TableName?: string;
  Attributes: object;
}

export {
  QueryDynamoParams,
  PutDynamoParams,
  UpdateDynamoParams,
  ScanDynamoParams,
};
