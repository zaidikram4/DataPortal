/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDataItem = /* GraphQL */ `
  mutation CreateDataItem(
    $input: CreateDataItemInput!
    $condition: ModelDataItemConditionInput
  ) {
    createDataItem(input: $input, condition: $condition) {
      id
      title
      value
      category
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateDataItem = /* GraphQL */ `
  mutation UpdateDataItem(
    $input: UpdateDataItemInput!
    $condition: ModelDataItemConditionInput
  ) {
    updateDataItem(input: $input, condition: $condition) {
      id
      title
      value
      category
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteDataItem = /* GraphQL */ `
  mutation DeleteDataItem(
    $input: DeleteDataItemInput!
    $condition: ModelDataItemConditionInput
  ) {
    deleteDataItem(input: $input, condition: $condition) {
      id
      title
      value
      category
      createdAt
      updatedAt
      __typename
    }
  }
`;
