import { gql } from 'apollo-server-express';

export default gql`
  type CreateStockMarketIndexResponse {
    id: String
    code: String
    opensAt: String
    closesAt: String
  }
 
  type Mutation {
    createStockMarketIndex(code: String!, opensAt: String! closesAt: String!): CreateStockMarketIndexResponse!
  }
`