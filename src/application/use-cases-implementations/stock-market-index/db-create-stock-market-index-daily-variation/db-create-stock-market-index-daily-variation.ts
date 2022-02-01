import { isOpened } from "@/application/application-helpers/stock-market-time";
import { ILoadStockMarketIndexByCodeRepository } from "@/application/infra-protocols/db/stock-market-index-repositories/load-stock-market-index-by-code-repository";
import { IStockMarketIndexDailyVariation } from "@/domain/entities/stock-market-index";
import { CreateStockMarketIndexDailyVariationRequestProps, ICreateStockMarketIndexDailyVariationIndex } from "@/domain/use-cases-protocols/stock-market-index.ts/create-stock-market-index-daily-variation";

export class DbCreateStockMarketIndexDailyVariation implements ICreateStockMarketIndexDailyVariationIndex {

  constructor(private readonly loadStockMarketIndexByCodeRepository: ILoadStockMarketIndexByCodeRepository) {}

  async create({ code, value }: CreateStockMarketIndexDailyVariationRequestProps): Promise<IStockMarketIndexDailyVariation> {
    //STEP 1 - verify if code exists in stockMarketIndex - return null if not exists
    const stockMarketIndex = await this.loadStockMarketIndexByCodeRepository.loadByCode(code);
    if (!stockMarketIndex) {
      return null;
    }

    //STEP 2 - verify if market is open - return null if not
    const { opensAt, closesAt } = stockMarketIndex;
    if (!isOpened(opensAt, closesAt)) {
      return null;
    }


    //STEP 3 - verify if code is already registred in daily


    //STEP 4 -  if not create a new one
    //STEP 5 -  if already exists update them

    // return IStockMarketIndexDaily

    return null;
  }
}