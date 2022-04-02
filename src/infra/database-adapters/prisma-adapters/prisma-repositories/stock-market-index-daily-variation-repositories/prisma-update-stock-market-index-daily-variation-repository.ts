
import { Client } from '../../client';
import { IUpdateStockMarketIndexDailyVariationRepository } from "@/application/infra-protocols/db/stock-market-index-daily-variations-repositories/update-stock-market-index-daily-variation-repository";
import { IStockMarketIndexDailyVariation } from "@/domain/entities/stock-market-index";
import { CreateStockMarketIndexDailyVariationRequestProps } from "@/domain/use-cases-protocols/stock-market-index/create-stock-market-index-daily-variation";

export class PrismaUpdateStockMarketIndexDailyVariationRepository implements IUpdateStockMarketIndexDailyVariationRepository {
  async update(request: CreateStockMarketIndexDailyVariationRequestProps): Promise<IStockMarketIndexDailyVariation> {

    try {
      const client = Client.getInstance();
      const { code } = request;

      const stockMarketIndex = await client.stockMarketIndex.findFirst({
        where: {
          code
        }
      });

      if (!stockMarketIndex) {
        return null
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
      });

      if (!stockMarketIndexDailyVariation) {
        return null;
      }

      const updatedStockMarketIndexDailyVariation = await client.stockMarketIndexDailyVariation.update({
        where: {
          id: stockMarketIndexDailyVariation.id
        },
        data: {
          value
        }
      })

      if (!updatedStockMarketIndexDailyVariation) {
        return null;
      }

      return updatedStockMarketIndexDailyVariation;

    } catch {
      return null;
    }
  }
} 