import { Client } from '../../client';

import { ICreateStockMarketIndexDailyVariationRepository } from "@/application/infra-protocols/db/stock-market-index-daily-variations-repositories/create-stock-market-index-daily-variation-repository";
import { IStockMarketIndexDailyVariation } from "@/domain/entities/stock-market-index";
import { CreateStockMarketIndexDailyVariationRequestProps } from "@/domain/use-cases-protocols/stock-market-index.ts/create-stock-market-index-daily-variation";

export class PrismaCreateStockMarketIndexDailyVariationRepository implements ICreateStockMarketIndexDailyVariationRepository {
  async create(request: CreateStockMarketIndexDailyVariationRequestProps): Promise<IStockMarketIndexDailyVariation> {
    try {
      const client = Client.getInstance();
      const { code, value } = request;

      const stockMarketIndex = await client.stockMarketIndex.findFirst({
        where: {
          code
        }
      });

      if (!stockMarketIndex) {
        return null;
      }

      const { id: stockMarketIndexId } = stockMarketIndex;
      const stockMarketIndexDailyVariation = await client.stockMarketIndexDailyVariation.create({
        data: {
          stockMarketIndexId,
          value,
          min: value,
          max: value
        }
      })

      return stockMarketIndexDailyVariation;
    } catch {
      return null;
    }
  }
}