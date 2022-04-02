import { ICreateStockRepository } from "@/application/infra-protocols/db/stock/create-stock-repository";
import { IWebRequestStockInformations } from "@/application/infra-protocols/web-request/web-request-stock-informations";
import { CreateStockRequest, ICreateStock } from "@/domain/use-cases-protocols/stock/create-stock";

export class DbCreateStock implements ICreateStock {
  constructor(
    private readonly createStockRepository: ICreateStockRepository,
    private readonly requestStockInfo: IWebRequestStockInformations
  ) {}

  async create(request: CreateStockRequest): Promise<void> {
    if (!request) {
      return null;
    }

    const {  code } = request;

    const stocks = await this.requestStockInfo.getStocksInformations({
      code,
      time_series: 'TIME_SERIES_DAILY'
    });


    await this.createStockRepository.create({
      code: stocks.code,
      history: stocks.history
    })

    // const response = await this.createStockRepository.create({
    //   close, code, high, low, open, volume
    // });

    return;
  }
}