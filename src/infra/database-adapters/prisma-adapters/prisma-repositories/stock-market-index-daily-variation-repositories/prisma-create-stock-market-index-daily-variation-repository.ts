import { Client } from '../../client';

import { ICreateStockMarketIndexDailyVariationRepository } from "@/application/infra-protocols/db/stock-market-index-daily-variations-repositories/create-stock-market-index-daily-variation-repository";
import { IStockMarketIndexDailyVariation } from "@/domain/entities/stock-market-index";
import { CreateStockMarketIndexDailyVariationRequestProps } from "@/domain/use-cases-protocols/stock-market-index/create-stock-market-index-daily-variation";
import { StockMarketIndexDailyVariationResponseDto } from '@/application/dtos/stock-market-index-daily-variation-dto/stock-market-index-daily-variation-response-dto';

export class PrismaCreateStockMarketIndexDailyVariationRepository implements ICreateStockMarketIndexDailyVariationRepository {

  async create(request: CreateStockMarketIndexDailyVariationRequestProps): Promise<IStockMarketIndexDailyVariation> {
    console.log('trying to create...');
    try {
      const client = Client.getInstance();
      const { code } = request;

      const stockMarketIndex = await client.stockMarketIndex.findFirst({
        where: {
          code
        }
      });

      if (!stockMarketIndex) {
        return null;
      }



      // const { id: stockMarketIndexId } = stockMarketIndex;
      // const stockMarketIndexDailyVariation = await client.stockMarketIndexDailyVariation.create({
      //   data: {
      //     stockMarketIndexId,
      //     value: 0,
      //     min: 0,
      //     max: 0
      //   }
      // })
      // return stockMarketIndexDailyVariation;
      return null;
    } catch {
      return null;
    }
  }
}