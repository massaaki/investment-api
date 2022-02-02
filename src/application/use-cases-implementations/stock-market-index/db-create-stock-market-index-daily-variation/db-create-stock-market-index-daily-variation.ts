import { isOpened } from "@/application/application-helpers/stock-market-time";
import { ICreateStockMarketIndexDailyVariationRepository } from "@/application/infra-protocols/db/stock-market-index-daily-variations-repositories/create-stock-market-index-daily-variation-repository";
import { ILoadStockMarketIndexVariationDailyByCodeRepository } from "@/application/infra-protocols/db/stock-market-index-daily-variations-repositories/load-stock-market-index-variation-daily-by-code-repository";
import { IUpdateStockMarketIndexDailyVariationRepository } from "@/application/infra-protocols/db/stock-market-index-daily-variations-repositories/update-stock-market-index-daily-variation-repository";
import { ILoadStockMarketIndexByCodeRepository } from "@/application/infra-protocols/db/stock-market-index-repositories/load-stock-market-index-by-code-repository";
import { ICrawlerFindStockIndexValue } from "@/application/infra-protocols/web-crawler/crawler-find-stock-index-value";
import { IStockMarketIndexDailyVariation } from "@/domain/entities/stock-market-index";
import { CreateStockMarketIndexDailyVariationRequestProps, ICreateStockMarketIndexDailyVariationIndex } from "@/domain/use-cases-protocols/stock-market-index.ts/create-stock-market-index-daily-variation";

export class DbCreateStockMarketIndexDailyVariation implements ICreateStockMarketIndexDailyVariationIndex {

  constructor(
    private readonly loadStockMarketIndexByCodeRepository: ILoadStockMarketIndexByCodeRepository,
    private readonly loadStockMarketIndexDailyByCodeRepository: ILoadStockMarketIndexVariationDailyByCodeRepository,
    private readonly createStockMarketIndexDailyVariationRepository: ICreateStockMarketIndexDailyVariationRepository,
    private readonly updateStockMarketIndexDailyVariationRepository: IUpdateStockMarketIndexDailyVariationRepository,
    private readonly crawlerFindStockIndexValue: ICrawlerFindStockIndexValue
  ) {}

  async create({ code, value }: CreateStockMarketIndexDailyVariationRequestProps): Promise<IStockMarketIndexDailyVariation> {
    //STEP 1 - verify if code exists in stockMarketIndex - return null if not exists
    const stockMarketIndex = await this.loadStockMarketIndexByCodeRepository.loadByCode(code);
    if (!stockMarketIndex) {
      return null;
    }

    //STEP 2 - verify if market is open - return null if not
    const { opensAt, closesAt } = stockMarketIndex;

    const marketIsOpened = isOpened(opensAt, closesAt);
    if (!marketIsOpened) {
      return null;
    }

    //STEP 3 - Get Market Value from crawler
    const scrapResponse = await this.crawlerFindStockIndexValue.scrap({
      code,
      siteUrl: 'https://finance.yahoo.com/quote/%5EBVSP'
    });

    if (!scrapResponse) {
      return null;
    }

    //STEP 4 - verify if code is already registred in daily
    const alreadyRegistredToday = await this.loadStockMarketIndexDailyByCodeRepository.loadByCode(code);

    //STEP 5 -  if not create a new one
    if (!alreadyRegistredToday) {
      const stockMarketIndexDailyVariation = await this.createStockMarketIndexDailyVariationRepository.create({
        code,
        value: scrapResponse.value
      });
      return stockMarketIndexDailyVariation;
    }

    //STEP 6 -  if already exists update them
    const stockMarketIndexDailyVariation = await this.updateStockMarketIndexDailyVariationRepository.update({
      code,
      value: scrapResponse.value
    });

    return stockMarketIndexDailyVariation;
  }
}