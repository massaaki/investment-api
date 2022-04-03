import { gql } from 'apollo-server-express'

export default gql`
   type Error {
    type: String
  }

  type Result {
    code: String
  }

  type CreateStockResponse {
    error: Error
    result: Result
  }

  type Mutation {
    createStock(code: String!): CreateStockResponse!
  }


`