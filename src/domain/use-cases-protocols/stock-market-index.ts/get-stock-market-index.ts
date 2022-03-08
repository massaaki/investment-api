import { IStockMarketIndexDailyVariation } from "@/domain/entities/stock-market-index"

export type GetStockMarketInformationsRequest = {
  code: string
}
export type GetStockMarketInformationsResponse = {
  code: string;
  history: IStockMarketIndexDailyVariation[];
}

export interface IGetStockMarketInformations {
  getStocksInformations(request: GetStockMarketInformationsRequest): Promise<GetStockMarketInformationsResponse>
}