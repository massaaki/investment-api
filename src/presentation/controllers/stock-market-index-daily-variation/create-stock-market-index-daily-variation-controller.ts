import { ICreateStockMarketIndexDailyVariationIndex } from "@/domain/use-cases-protocols/stock-market-index.ts/create-stock-market-index-daily-variation";
import { ok, serverError } from "@/presentation/helpers/http-helper";
import { IController } from "@/presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "@/presentation/protocols/http";

export class CreateStockMarketIndexDailyVariationController implements IController {

  constructor(
    private readonly createStockMarketIndexDailyVariation: ICreateStockMarketIndexDailyVariationIndex
  ) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    try {
      const { code, value } = httpRequest.body;

      const stockMarketIndexDailyVariation = await this.createStockMarketIndexDailyVariation.create({
        code,
        value
      })

      if (!stockMarketIndexDailyVariation) {
        return null;
      }

      return ok(stockMarketIndexDailyVariation);

    } catch (error) {
      return serverError(error);
    }

  }
}