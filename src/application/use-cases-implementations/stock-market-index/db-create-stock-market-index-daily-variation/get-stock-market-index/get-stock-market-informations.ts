import { IWebRequestStockInformations } from "@/application/infra-protocols/web-request/web-request-stock-informations";
import { GetStockMarketInformationsRequest, GetStockMarketInformationsResponse, IGetStockMarketInformations } from "@/domain/use-cases-protocols/stock-market-index/get-stock-market-index";


export class GetStockMarketInformations implements IGetStockMarketInformations {

  constructor(private readonly webRequestStockInformations: IWebRequestStockInformations) {}

  async getStocksInformations(request: GetStockMarketInformationsRequest): Promise<GetStockMarketInformationsResponse> {
    const informations = await this.webRequestStockInformations.getStocksInformations({ code: request.code });

    if (!informations) {
      return null;
    }

    const history = informations.history.map(info => ({
      value: info.close,
      min: info.low,
      max: info.high,
      volume: info.volume
    }));


    return {
      code: informations.code,
      history
    }
  }

}