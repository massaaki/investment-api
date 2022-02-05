import { IStockMarketCompany, IStockMarketCompanyValue } from "@/domain/entities/stock-market-company";

export type CreateStockMarketCompanyValueRequest = {
  value: number;
  min: number;
  max: number;
}

export interface ICreateStockMarketCompanyValue {
  create(request: CreateStockMarketCompanyValueRequest): Promise<IStockMarketCompanyValue>
}