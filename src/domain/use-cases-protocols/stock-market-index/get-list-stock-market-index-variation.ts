import { IStockMarketIndexDailyVariation } from "@/domain/entities/stock-market-index";

export interface IGetListStockMarketIndexVariation {
  getByCode(code: string): Promise<IStockMarketIndexDailyVariation[]>
}