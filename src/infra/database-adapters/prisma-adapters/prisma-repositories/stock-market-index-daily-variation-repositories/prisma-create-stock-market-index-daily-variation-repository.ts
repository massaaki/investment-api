import { Client } from '../../client';

import { ICreateStockMarketIndexDailyVariationRepository } from "@/application/infra-protocols/db/stock-market-index-daily-variations-repositories/create-stock-market-index-daily-variation-repository";
import { IStockMarketIndexDailyVariation } from "@/domain/entities/stock-market-index";
import { CreateStockMarketIndexDailyVariationRequestProps } from "@/domain/use-cases-protocols/stock-market-index/create-stock-market-index-daily-variation";

export class PrismaCreateStockMarketIndexDailyVariationRepository implements ICreateStockMarketIndexDailyVariationRepository {

  async create(request: CreateStockMarketIndexDailyVariationRequestProps): Promise<void> {

    try {
      const client = Client.getInstance();
      const { code, history } = request;

      const stockMarketIndex = await client.stockMarketIndex.findFirst({
        where: {
          code
        }
      });

      if (!stockMarketIndex) {
        return null;
      }

      const { id: stockMarketIndexId } = stockMarketIndex;


      const stockDatas = history.map((stock) => ({
        stockMarketIndexId,
        value: stock.close,
        min: stock.low,
        max: stock.high,
        volume: stock.volume,
        created_at: stock.date
      }))


      await client.stockMarketIndexDailyVariation.createMany({
        data: stockDatas,
        skipDuplicates: true
      })

      return null;
    } catch {
      return null;
    }
  }
}