import { IGetStockMarketIndexVariationRepository } from "@/application/infra-protocols/db/stock-market-index-daily-variations-repositories/get-list-stock-market-index-variation-repository";
import { IStockMarketIndexDailyVariation } from "@/domain/entities/stock-market-index";
import { IGetListStockMarketIndexVariation } from "@/domain/use-cases-protocols/stock-market-index/get-list-stock-market-index-variation";

export class DbListStockMarketIndexVariation implements IGetListStockMarketIndexVariation {
  constructor(private readonly getListStockMarketIndexVariationRepository: IGetStockMarketIndexVariationRepository) {}


  async getByCode(code: string): Promise<IStockMarketIndexDailyVariation[]> {
    const response = await this.getListStockMarketIndexVariationRepository.getByCode(code);

    return response;
  }
  
}