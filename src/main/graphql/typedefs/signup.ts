import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: String
    name: String
    email: String
  }
 

  # Mutations 
  type Mutation {
    signup(name: String!, email: String! password: String!): User!
  }

`