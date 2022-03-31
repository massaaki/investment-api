import { ICreateStockMarketIndexDailyVariationIndex } from "@/domain/use-cases-protocols/stock-market-index/create-stock-market-index-daily-variation";
import { IGetStockMarketInformations } from "@/domain/use-cases-protocols/stock-market-index/get-stock-market-index";
import { ok, serverError } from "@/presentation/helpers/http-helper";
import { IController } from "@/presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "@/presentation/protocols/http";

export class CreateStockMarketIndexDailyVariationController implements IController {

  constructor(
    private readonly createStockMarketIndexDailyVariation: ICreateStockMarketIndexDailyVariationIndex,
    private readonly getStockMarketInformations: IGetStockMarketInformations
  ) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    try {
      const { code } = httpRequest.body;

      const { history } = await this.getStockMarketInformations.getStocksInformations({
        code
      }) as any;

      const stockMarketIndexDailyVariation = await this.createStockMarketIndexDailyVariation.create({
        code, history
      })

      return ok('');

    } catch (error) {
      return serverError(error);
    }
  }
}