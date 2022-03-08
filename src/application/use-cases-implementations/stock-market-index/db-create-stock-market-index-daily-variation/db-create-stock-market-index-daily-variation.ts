import { ICreateStockMarketIndexDailyVariationRepository } from "@/application/infra-protocols/db/stock-market-index-daily-variations-repositories/create-stock-market-index-daily-variation-repository";
import { ILoadStockMarketIndexVariationDailyByCodeRepository } from "@/application/infra-protocols/db/stock-market-index-daily-variations-repositories/load-stock-market-index-variation-daily-by-code-repository";
import { IUpdateStockMarketIndexDailyVariationRepository } from "@/application/infra-protocols/db/stock-market-index-daily-variations-repositories/update-stock-market-index-daily-variation-repository";
import { ILoadStockMarketIndexByCodeRepository } from "@/application/infra-protocols/db/stock-market-index-repositories/load-stock-market-index-by-code-repository";
import { ICrawlerFindStockIndexValue } from "@/application/infra-protocols/web-crawler/crawler-find-stock-index-value";
import { IStockMarketIndexDailyVariation } from "@/domain/entities/stock-market-index";
import { CreateStockMarketIndexDailyVariationRequestProps, ICreateStockMarketIndexDailyVariationIndex } from "@/domain/use-cases-protocols/stock-market-index/create-stock-market-index-daily-variation";

export class DbCreateStockMarketIndexDailyVariation implements ICreateStockMarketIndexDailyVariationIndex {

  constructor(
    private readonly loadStockMarketIndexByCodeRepository: ILoadStockMarketIndexByCodeRepository,
    private readonly loadStockMarketIndexDailyByCodeRepository: ILoadStockMarketIndexVariationDailyByCodeRepository,
    private readonly createStockMarketIndexDailyVariationRepository: ICreateStockMarketIndexDailyVariationRepository,
    private readonly updateStockMarketIndexDailyVariationRepository: IUpdateStockMarketIndexDailyVariationRepository,
    private readonly crawlerFindStockIndexValue: ICrawlerFindStockIndexValue
  ) {}

  async create({ code, history }: CreateStockMarketIndexDailyVariationRequestProps): Promise<IStockMarketIndexDailyVariation> {
    const stockMarketIndex = await this.loadStockMarketIndexByCodeRepository.loadByCode(code);
    if (!stockMarketIndex) {
      return null;
    }

    const lastStockRegistered = await this.loadStockMarketIndexDailyByCodeRepository.loadByCode(code);

    let filteredHistory: IStockMarketIndexDailyVariation[] = history;
    if (lastStockRegistered) {
      filteredHistory = history.filter(stock => stock.date > lastStockRegistered.date);
    }

    await this.createStockMarketIndexDailyVariationRepository.create({
      code,
      history: filteredHistory as any
    });
  }
}
