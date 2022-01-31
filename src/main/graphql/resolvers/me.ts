
type Response = {
  error?: {
    type: string
  },
  result?: {
    id?: string,
    name?: string,
    email?: string
  }
}


export default {
  Query: {
    me: (parent, args, context): Response => {
      const auth = context.authentication

      if (auth.error) {
        return {
          error: {
            type: auth.error.message
          }
        }
      }

      return {
        result: {
          id: 'any-id',
          name: 'any-name',
          email: 'any-email'
        }
      }
    }
  }
}