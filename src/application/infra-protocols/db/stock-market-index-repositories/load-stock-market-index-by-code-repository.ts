import { StockMarketIndexResponseDto } from "@/application/dtos/stock-market-index-dto/stock-market-index-response-dto";

export interface ILoadStockMarketIndexByCodeRepository {
  loadByCode(code: string): Promise<StockMarketIndexResponseDto>;
}