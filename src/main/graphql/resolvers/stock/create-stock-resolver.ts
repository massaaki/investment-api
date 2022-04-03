import { makeCreateStockFactory } from "@/main/factories/stock/create-stock-factory";
import { HttpRequest } from "@/presentation/protocols/http";

type Response = {
  error?: {
    type: string
  },
  result?: {
    code?: string
  }
}

export default {
  Mutation: {
    createStock: async (parent, args, context): Promise<Response> => {
      const auth = context.authentication

      if (auth.error) {
        return {
          error: {
            type: auth.error.message
          }
        }
      }

      //Ensure authenticated as admin logic here
      if (!auth.isAdmin) {
        return {
          error: {
            type: "Admin is required"
          }
        }
      }

      const { code } = args

      const controller = makeCreateStockFactory();
      const httpRequest: HttpRequest = {
        body: {
          code
        }
      }

      const response = await controller.handle(httpRequest);
      if (!response) {
        return {
          error: {
            type: `response error ${response}`
          }
        }
      }
      return {
        result: {
          code: code
        }
      }
    }
  }
}