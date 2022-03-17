import { IGetListStockMarketIndexVariation } from "@/domain/use-cases-protocols/stock-market-index/get-list-stock-market-index-variation";
import { IController } from "@/presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "@/presentation/protocols/http";
import { ok, serverError } from "@/presentation/helpers/http-helper";

export class GetListStockMarketIndexVariationController implements IController {
  constructor(private readonly getListStockMarketIndexVariation: IGetListStockMarketIndexVariation){}


  async handle(httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    try {
      const { code } = httpRequest.body;
      const response = await this.getListStockMarketIndexVariation.getByCode(code);

      return ok(response);
    } catch (err) {
      serverError(err);
    }
  }
}