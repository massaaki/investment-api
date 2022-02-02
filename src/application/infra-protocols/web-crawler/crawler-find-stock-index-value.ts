import { CrawlerFindStockIndexValueRequestDto } from "@/application/dtos/crawler-find-stock-index-value-dto/crawler-find-stock-index-value-request-dto";
import { CrawlerFindStockIndexValueResponseDto } from "@/application/dtos/crawler-find-stock-index-value-dto/crawler-find-stock-index-value-response-dto";


export interface ICrawlerFindStockIndexValue {
  scrap(request: CrawlerFindStockIndexValueRequestDto): Promise<CrawlerFindStockIndexValueResponseDto>;
}