import { IStockMarketIndexDailyVariation } from "@/domain/entities/stock-market-index";

export type CreateStockMarketIndexDailyVariationRequestProps = {
  code: string;
  value: number;
}

export interface ICreateStockMarketIndexDailyVariationIndex {
  create(request: CreateStockMarketIndexDailyVariationRequestProps): Promise<IStockMarketIndexDailyVariation>;
}