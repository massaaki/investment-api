import { ICreateStockMarketIndex } from "@/domain/use-cases-protocols/stock-market-index/create-stock-market-index";
import { ok, serverError } from "@/presentation/helpers/http-helper";
import { IController } from "@/presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "@/presentation/protocols/http";

export class CreateStockMarketIndexController implements IController {

  constructor(private readonly createStockMarketIndex: ICreateStockMarketIndex) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    try {
      const { code, opensAt, closesAt } = httpRequest.body;

      const response = await this.createStockMarketIndex.create({
        code,
        opensAt,
        closesAt
      })

      return ok(response);

    } catch (error) {
      return serverError(error);
    }
  }

}