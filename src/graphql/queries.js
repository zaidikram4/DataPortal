/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDataItem = /* GraphQL */ `
  query GetDataItem($id: ID!) {
    getDataItem(id: $id) {
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
export const listDataItems = /* GraphQL */ `
  query ListDataItems(
    $filter: ModelDataItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDataItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        value
        category
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
