import { gql } from 'apollo-server-express';

export default gql`

  type Error {
    type: String
  }

  type Result {
    id: String
    name: String
    email: String
    isAdmin: Boolean
  }

  type Response {
    error: Error
    result: Result
  }

  extend type Query {
    me: Response!
  }
`