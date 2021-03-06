import { gql } from 'apollo-server-express';

export default gql`

  type Error {
    type: String
  }

  type Result {
    message: String
  }

  type SayHelloResponse {
    error: Error
    result: Result
  }

  extend type Query {
    sayHello: SayHelloResponse!
  }
`