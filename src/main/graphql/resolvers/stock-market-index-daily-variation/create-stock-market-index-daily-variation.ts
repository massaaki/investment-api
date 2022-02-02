import { makeCreateStockMarketIndexDailyVariationController } from "@/main/factories/stock-market-index-daily-variations/create-stock-market-index-daily-variation-controller.factory";
import { HttpRequest } from "@/presentation/protocols/http";

type Response = {
  error?: {
    type: string
  },
  result?: {
    code?: string,
    value?: number
  }
}



export default {
  Mutation: {
    createStockMarketIndexDailyVariation: async (parent, args, context): Promise<Response> => {
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

      const controller = makeCreateStockMarketIndexDailyVariationController();
      const httpRequest: HttpRequest = {
        body: {
          code,
          value: 10
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
          value: response.body.value
        }
      }
    }
  }
}