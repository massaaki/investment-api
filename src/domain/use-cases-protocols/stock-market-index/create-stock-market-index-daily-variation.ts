import { IStockMarketIndexDailyVariation } from "@/domain/entities/stock-market-index";



export type HistoryStocksProps = {
  close: number;
  high: number;
  low: number;
  open: number;
  volume: number;
  date: Date;
}


export type CreateStockMarketIndexDailyVariationRequestProps = {
  code: string;
  history: HistoryStocksProps[];
}

export interface ICreateStockMarketIndexDailyVariationIndex {
  create(request: CreateStockMarketIndexDailyVariationRequestProps): Promise<IStockMarketIndexDailyVariation>;
}