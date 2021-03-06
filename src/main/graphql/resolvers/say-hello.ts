
type Response = {
  error?: {
    type: string
  },
  result?: {
    message?: string
  }
}


export default {
  Query: {
    sayHello: (parent, args, context): Response => {
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
          message: 'hello world'
        }
      }
    }
  }
}