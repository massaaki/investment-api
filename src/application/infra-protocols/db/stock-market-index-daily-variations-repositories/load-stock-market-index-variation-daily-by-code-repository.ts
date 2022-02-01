import { StockMarketIndexDailyVariationResponseDto } from "@/application/dtos/stock-market-index-daily-variation-dto/stock-market-index-daily-variation-response-dto";

export interface ILoadStockMarketIndexVariationDailyByCodeRepository {
  loadByCode(code: string): Promise<StockMarketIndexDailyVariationResponseDto>;
}