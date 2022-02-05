import { ICreateStockMarketCompanyRepositoryRequestDto } from "@/application/dtos/stock-market-company-dto/create-stock-market-company-repository-request-dto copy";
import { ICreateStockMarketCompanyRepositoryResponseDto } from "@/application/dtos/stock-market-company-dto/create-stock-market-company-repository-response-dto";

export interface ICreateStockMarketCompanyRepository {
  create(request: ICreateStockMarketCompanyRepositoryRequestDto): Promise<ICreateStockMarketCompanyRepositoryResponseDto>
}