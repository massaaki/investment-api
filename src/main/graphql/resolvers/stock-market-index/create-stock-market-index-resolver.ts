import { makeStockMarketIndexControllerFactory } from "@/main/factories/stock-market-indexes/create-stock-market-index-controller-factory";
import { HttpRequest } from "@/presentation/protocols/http";

type CreateStockMarketIndexResponse = {
  id: string;
  code: string;
  opensAt: string;
  closesAt: string;
}

export default {
  Mutation: {
    createStockMarketIndex: async (parent, args): Promise<CreateStockMarketIndexResponse> => {
      const { code, opensAt, closesAt } = args

      //Ensure authenticated as admin logic here

      const controller = makeStockMarketIndexControllerFactory();
      const httpRequest: HttpRequest = {
        body: {
          code,
          opensAt,
          closesAt
        }
      }

      const httpResponse = await controller.handle(httpRequest);

      return {
        id: httpResponse.body.id,
        code: httpResponse.body.code,
        opensAt: httpResponse.body.opensAt,
        closesAt: httpResponse.body.closesAt
      };
    }
  }
}