import { IStockMarketIndex } from "@/domain/entities/stock-market-index";
import { CreateStockMarketRequestProps, ICreateStockMarketIndex } from "@/domain/use-cases-protocols/stock-market-index.ts/create-stock-market-index";
import { ICreateMarketIndexRepository } from "@/application/infra-protocols/db/stock-market-index-repositories/create-stock-market-index-repository";

export class DbCreateStockMarketIndex implements ICreateStockMarketIndex {

  constructor(
    private readonly createStockMarketIndexRepository: ICreateMarketIndexRepository
  ) {}

  async create({ code, opensAt, closesAt }: CreateStockMarketRequestProps): Promise<IStockMarketIndex> {

    await this.createStockMarketIndexRepository.create({ code, opensAt, closesAt });


    return null;
  }

}