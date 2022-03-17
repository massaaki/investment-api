import { makeGetListStockMarketIndexVariationControllerFactory } from "@/main/factories/stock-market-index-daily-variations/get-list-stock-market-index-variation-controller-factory";
import { HttpRequest } from "@/presentation/protocols/http";

type Response = {
  error?: {
    type: string
  },
  result?: {
    body?: any
  }
}



export default {
  Query: {
    getListStockMarketIndexVariation: async (parent, args, context): Promise<Response> => {

      const { code } = args

      const controller = makeGetListStockMarketIndexVariationControllerFactory();
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
        result:  response.body
      }
    }
  }
}
