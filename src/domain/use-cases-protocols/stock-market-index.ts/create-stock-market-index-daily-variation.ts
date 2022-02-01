import { IStockMarketIndexDailyVariation } from "@/domain/entities/stock-market-index";

export type CreateStockMarketIndexDailyVariationRequestProps = {
  code: string
  opensAt: string
  closesAt: string
}

export interface ICreateStockMarketIndexDailyVariationIndex {
  create(request: CreateStockMarketIndexDailyVariationRequestProps): Promise<IStockMarketIndexDailyVariation>;
}