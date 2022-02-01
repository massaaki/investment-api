import { StockMarketIndexRequestDto } from "@/application/dtos/stock-market-index-dto/stock-market-index-request-dto";
import { StockMarketIndexResponseDto } from "@/application/dtos/stock-market-index-dto/stock-market-index-response-dto";

export interface ICreateMarketIndexRepository {
  create(request: StockMarketIndexRequestDto): Promise<StockMarketIndexResponseDto>
}