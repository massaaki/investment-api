import { ICreateStock } from "@/domain/use-cases-protocols/stock/create-stock";
import { serverError, ok } from "@/presentation/helpers/http-helper";
import { IController } from "@/presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "@/presentation/protocols/http";

export class CreateStockController implements IController {
  constructor(private readonly createStock: ICreateStock){}
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    try {
      const {code} = httpRequest.body;
      await this.createStock.create({ code });

      return ok();
    } catch(error) {
      return serverError(error)
    }
  }
}