import { Client } from '../../client'

import { GetStockMarketIndexVariationRepositoryResponseDto, IGetStockMarketIndexVariationRepository } from "@/application/infra-protocols/db/stock-market-index-daily-variations-repositories/get-list-stock-market-index-variation-repository";

export class PrismaGetListStockMarketIndexVariationRepository implements IGetStockMarketIndexVariationRepository {
  async getByCode(code: string): Promise<GetStockMarketIndexVariationRepositoryResponseDto> {
    try {
      const client = Client.getInstance();

      // creating a currentDate-12months to filter in database request
      const today = new Date();
      const totalDays = 30 * 12; // 12 months
      const baseData = new Date(new Date().setDate(today.getDate() - totalDays))
      
      const list = await client.stockMarketIndexDailyVariation.findMany({
        where: {
          created_at: {
            gt: baseData
          }
        },
        orderBy: {
          created_at: 'desc'
        }
      })
      return list;
    } catch (err) {
      return null;
    }
  }
}