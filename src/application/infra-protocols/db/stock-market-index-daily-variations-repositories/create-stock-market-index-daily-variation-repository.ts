import { StockMarketIndexDailyVariationRequestDto } from "@/application/dtos/stock-market-index-daily-variation-dto/stock-market-index-daily-variation-request-dto";
// import { StockMarketIndexDailyVariationResponseDto } from "@/application/dtos/stock-market-index-daily-variation-dto/stock-market-index-daily-variation-response-dto";

export interface ICreateStockMarketIndexDailyVariationRepository {
  create(request: StockMarketIndexDailyVariationRequestDto): Promise<void>;
}