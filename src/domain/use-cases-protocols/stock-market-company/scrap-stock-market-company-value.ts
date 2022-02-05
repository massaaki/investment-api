import { IStockMarketCompanyValue } from "@/domain/entities/stock-market-company";

export type ScrapStockMarketCompanyValueRequest = {
  siteUrl: string;
}


export interface IScrapStockMarketCompanyValue {
  scrap(request: ScrapStockMarketCompanyValueRequest): Promise<Partial<IStockMarketCompanyValue>>
}