import { IStockMarketCompany } from "@/domain/entities/stock-market-company";

export type LoadStockMarketCompanyByCodeRepositoryResponseDto = IStockMarketCompany

export interface ILoadStockMarketCompanyByCodeRepository {
  loadByCode(code: string): Promise<LoadStockMarketCompanyByCodeRepositoryResponseDto>
}