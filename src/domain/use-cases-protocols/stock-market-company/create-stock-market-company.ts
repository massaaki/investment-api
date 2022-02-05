import { IStockMarketCompany } from "@/domain/entities/stock-market-company";

export type CreateStockMarketCompanyRequest = {
  name: string;
  code: string;
}

export interface ICreateStockMarketCompany {
  create(request: CreateStockMarketCompanyRequest): Promise<IStockMarketCompany>
}