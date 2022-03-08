import { IStockMarketIndex } from "@/domain/entities/stock-market-index";

export type CreateStockMarketRequestProps = {
  code: string
  opensAt: string
  closesAt: string
}

export interface ICreateStockMarketIndex {
  create(request: CreateStockMarketRequestProps): Promise<IStockMarketIndex>;
}