import { ICreateStockMarketIndexDailyVariationIndex } from "@/domain/use-cases-protocols/stock-market-index/create-stock-market-index-daily-variation";
import { IGetStockMarketInformations } from "@/domain/use-cases-protocols/stock-market-index/get-stock-market-index";
import { ok, serverError } from "@/presentation/helpers/http-helper";
import { IController } from "@/presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "@/presentation/protocols/http";

export class CreateStockMarketIndexDailyVariationController implements IController {

  constructor(
    private readonly createStockMarketIndexDailyVariation: ICreateStockMarketIndexDailyVariationIndex,
  ) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    try {
      const { code, value } = httpRequest.body;

      // const { history } = await this.getStockMarketInformations.getStocksInformations({
      //   code
      // });

      console.log('1');
      const stockMarketIndexDailyVariation = await this.createStockMarketIndexDailyVariation.create({
        code
      })

      // if (!stockMarketIndexDailyVariation) {
      //   return null;
      // }

      // return ok(stockMarketIndexDailyVariation);
      return ok('');

    } catch (error) {
      return serverError(error);
    }

  }
}