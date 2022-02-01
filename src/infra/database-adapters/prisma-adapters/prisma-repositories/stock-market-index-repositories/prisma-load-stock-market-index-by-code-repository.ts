import { Client } from '../../client';

import { ILoadStockMarketIndexByCodeRepository } from "@/application/infra-protocols/db/stock-market-index-repositories/load-stock-market-index-by-code-repository";
import { IStockMarketIndex } from "@/domain/entities/stock-market-index";

export class PrismaLoadStockMarketIndexByCodeRepository implements ILoadStockMarketIndexByCodeRepository {
  async loadByCode(code: string): Promise<IStockMarketIndex> {
    try {
      const client = Client.getInstance();
      const stockMarketIndex = await client.stockMarketIndex.findFirst({
        where: {
          code
        }
      });

      if (!stockMarketIndex) {
        return null;
      }

      return stockMarketIndex;
    } catch {
      return null;
    }
  }
}