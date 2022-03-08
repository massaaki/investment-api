import { Client } from '../../client';
import { ILoadStockMarketIndexVariationDailyByCodeRepository } from "@/application/infra-protocols/db/stock-market-index-daily-variations-repositories/load-stock-market-index-variation-daily-by-code-repository";
import { IStockMarketIndexDailyVariation } from "@/domain/entities/stock-market-index";

export class PrismaLoadStockMarketIndexVariationDailyByCodeRepository implements ILoadStockMarketIndexVariationDailyByCodeRepository {
  async loadByCode(code: string): Promise<IStockMarketIndexDailyVariation> {
    const client = Client.getInstance();

    const stockMarketIndex = await client.stockMarketIndexDailyVariation.findFirst({
      where: {
        stockMarketIndex: {
          code
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    if (!stockMarketIndex) {
      return null;
    }
    return stockMarketIndex;
  }

}