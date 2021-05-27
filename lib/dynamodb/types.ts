/* eslint-disable max-len */
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

interface BatchWriteDynamoParams {
  itemsToWrite: { [key: string]: string | number | boolean }[];
  tableName: string | undefined;
  tableKey: string;
}

interface DeleteDynamoParams {
  /**
   * The name of the table from which to delete the item.
   */
  TableName?: string;
  /**
   * A map of attribute names to AttributeValue objects, representing the primary key of the item to delete. For the primary key, you must provide all of the attributes. For example, with a simple primary key, you only need to provide a value for the partition key. For a composite primary key, you must provide values for both the partition key and the sort key.
   */
  Key: Object;
  /**
   * Use ReturnValues if you want to get the item attributes as they appeared before they were deleted. For DeleteItem, the valid values are:    NONE - If ReturnValues is not specified, or if its value is NONE, then nothing is returned. (This setting is the default for ReturnValues.)    ALL_OLD - The content of the old item is returned.    The ReturnValues parameter is used by several DynamoDB operations; however, DeleteItem does not recognize any values other than NONE or ALL_OLD.
   */
  ReturnValues?: 'NONE' | 'ALL_OLD';
  /**
   * A condition that must be satisfied in order for a conditional DeleteItem to succeed. An expression can contain any of the following:   Functions: attribute_exists | attribute_not_exists | attribute_type | contains | begins_with | size  These function names are case-sensitive.   Comparison operators: = | &lt;&gt; | &lt; | &gt; | &lt;= | &gt;= | BETWEEN | IN      Logical operators: AND | OR | NOT    For more information about condition expressions, see Condition Expressions in the Amazon DynamoDB Developer Guide.
   */
  ConditionExpression?: Object;
}

interface UpdateDynamoParams {
  ConditionExpression?: string;
  TableName?: string;
  Key?: object;
  Item: object;
}

interface ScanDynamoParams {
  TableName?: string;
  Attributes: object;
  RequiredAttributes?: object;
}

interface ConditionExpressionParams {
  FilterExpression?: string;
  ExpressionAttributeNames?: {};
  ExpressionAttributeValues?: {};
}

export {
  QueryDynamoParams,
  PutDynamoParams,
  BatchWriteDynamoParams,
  UpdateDynamoParams,
  ScanDynamoParams,
  DeleteDynamoParams,
  ConditionExpressionParams,
};
