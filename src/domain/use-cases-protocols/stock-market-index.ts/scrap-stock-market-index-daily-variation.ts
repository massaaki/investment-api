import { IStockMarketIndexDailyVariation } from "@/domain/entities/stock-market-index";

export type ScrapStockMarketIndexDailyVariationRequest = {
  code: string;
  siteUrl: string;
}


export interface IScrapStockMarketIndexDailyVariation {
  scrap(request: ScrapStockMarketIndexDailyVariationRequest): Promise<IStockMarketIndexDailyVariation>
}