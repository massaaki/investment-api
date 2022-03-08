import { IStockMarketIndexDailyVariation } from "@/domain/entities/stock-market-index"

export type GetStockMarketIndexRequest = {
  code: string
}

export interface IGetStockMarketIndex {
  getStockInformations(request: GetStockMarketIndexRequest): Promise<IStockMarketIndexDailyVariation>
}