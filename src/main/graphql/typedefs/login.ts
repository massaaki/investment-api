import { gql } from 'apollo-server-express';

export default gql`
  type Session {
    id: String
    isAdmin: Boolean
    token: String
    refreshToken: String
  }
 
  # Mutations 
  type Mutation {
    login( email: String! password: String!): Session!
  }

`