import { IStockMarketIndex } from "@/domain/entities/stock-market-index";
import { CreateStockMarketRequestProps, ICreateStockMarketIndex } from "@/domain/use-cases-protocols/stock-market-index.ts/create-stock-market-index";
import { ICreateMarketIndexRepository } from "@/application/infra-protocols/db/stock-market-index-repositories/create-stock-market-index-repository";
import { ILoadStockMarketIndexByCodeRepository } from "@/application/infra-protocols/db/stock-market-index-repositories/load-stock-market-index-by-code-repository";

export class DbCreateStockMarketIndex implements ICreateStockMarketIndex {

  constructor(
    private readonly loadStockMarketIndexByCodeRepository: ILoadStockMarketIndexByCodeRepository,
    private readonly createStockMarketIndexRepository: ICreateMarketIndexRepository
  ) {}

  async create({ code, opensAt, closesAt }: CreateStockMarketRequestProps): Promise<IStockMarketIndex> {

    // return null if code already exists
    const alreadyRegistred = await this.loadStockMarketIndexByCodeRepository.loadByCode(code);

    if (!alreadyRegistred) {
      const stockMarketIndex = await this.createStockMarketIndexRepository.create({ code, opensAt, closesAt });
      return stockMarketIndex;
    }
    return null;
  }
}