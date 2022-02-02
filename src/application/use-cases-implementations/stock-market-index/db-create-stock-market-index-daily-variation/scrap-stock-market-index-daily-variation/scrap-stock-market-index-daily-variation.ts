import { ICrawlerFindStockIndexValue } from "@/application/infra-protocols/web-crawler/crawler-find-stock-index-value";
import { IStockMarketIndexDailyVariation } from "@/domain/entities/stock-market-index";
import { IScrapStockMarketIndexDailyVariation, ScrapStockMarketIndexDailyVariationRequest } from "@/domain/use-cases-protocols/stock-market-index.ts/scrap-stock-market-index-daily-variation";

export class ScrapStockMarketIndexDailyVariation implements IScrapStockMarketIndexDailyVariation {

  constructor(
    private readonly crawlerFindStockIndexValue: ICrawlerFindStockIndexValue
  ) {}

  async scrap({ code, siteUrl }: ScrapStockMarketIndexDailyVariationRequest): Promise<IStockMarketIndexDailyVariation> {

    const stockValue = await this.crawlerFindStockIndexValue.scrap({
      code,
      siteUrl
    });

    if (!stockValue) {
      return null;
    };

    return {
      value: stockValue.value
    };
  }

}