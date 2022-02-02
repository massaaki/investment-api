import { gql } from 'apollo-server-express';

export default gql`
   type Error {
    type: String
  }

  type Result {
    code: String
    value: Float
  }

  type CreateStockMarketIndexDailyVariationResponse {
    error: Error
    result: Result
  }

  type Mutation {
    createStockMarketIndexDailyVariation(code: String!): CreateStockMarketIndexDailyVariationResponse!
  }
`