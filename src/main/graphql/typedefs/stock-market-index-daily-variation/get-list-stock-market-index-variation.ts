import { gql } from 'apollo-server-express';

export default gql`
   type Error {
    type: String
  }

  type Result {
    value: Float
    min: Float
    max: Float
    volume: Float
    created_at: String
  }

  type GetListStockMarketIndexVariationResponse {
    error: Error
    result: [Result!]
  }

  extend type Query {
    getListStockMarketIndexVariation(code: String!): GetListStockMarketIndexVariationResponse!
  }
`