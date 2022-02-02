//load last of today
import { Client } from '../../client';
import { ILoadStockMarketIndexVariationDailyByCodeRepository } from "@/application/infra-protocols/db/stock-market-index-daily-variations-repositories/load-stock-market-index-variation-daily-by-code-repository";
import { IStockMarketIndexDailyVariation } from "@/domain/entities/stock-market-index";

export class PrismaLoadStockMarketIndexVariationDailyByCodeRepository implements ILoadStockMarketIndexVariationDailyByCodeRepository {
  async loadByCode(code: string): Promise<IStockMarketIndexDailyVariation> {
    const client = Client.getInstance();

    const stockMarketIndex = await client.stockMarketIndex.findFirst({
      where: {
        code
      }
    });

    if (!stockMarketIndex) {
      return null;
    }

    const referenceDate = new Date();
    const year = referenceDate.getFullYear();
    const month = referenceDate.getMonth();
    const day = referenceDate.getDate();

    const todayStarts = new Date(year, month, day);
    const todayEnds = new Date(year, month, day, 23, 59);

    const stockMarketIndexDailyVariation = await client.stockMarketIndexDailyVariation.findFirst({
      where: {
        created_at: {
          gte: todayStarts,
          lt: todayEnds
        }
      }
    })

    if (!stockMarketIndexDailyVariation) {
      return null;
    }


    return stockMarketIndexDailyVariation;
  }

}