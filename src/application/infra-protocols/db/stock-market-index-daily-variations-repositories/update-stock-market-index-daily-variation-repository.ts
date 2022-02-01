import { StockMarketIndexDailyVariationRequestDto } from "@/application/dtos/stock-market-index-daily-variation-dto/stock-market-index-daily-variation-request-dto";
import { StockMarketIndexDailyVariationResponseDto } from "@/application/dtos/stock-market-index-daily-variation-dto/stock-market-index-daily-variation-response-dto";

export interface IUpdateStockMarketIndexDailyVariationRepository {
  update(request: StockMarketIndexDailyVariationRequestDto): Promise<StockMarketIndexDailyVariationResponseDto>;
}