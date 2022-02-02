import { makeCreateStockMarketIndexDailyVariationController } from "@/main/factories/stock-market-index-daily-variations/create-stock-market-index-daily-variation-controller.factory";
import { HttpRequest } from "@/presentation/protocols/http";

const controller = makeCreateStockMarketIndexDailyVariationController();


export async function createOrUpdateStockDailyVariation() {
  type requestType = {
    code: string
    value: number
  }


  const request: HttpRequest<requestType> = {
    body: {
      code: 'IBOV',
      value: Math.floor(Math.random() * 100)
    }
  }

  await controller.handle(request);
}


