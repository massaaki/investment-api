import { Client } from '../../client'

import { ICreateMarketIndexRepository } from "@/application/infra-protocols/db/stock-market-index-repositories/create-stock-market-index-repository";
import { StockMarketIndexRequestDto } from "@/application/dtos/stock-market-index-dto/stock-market-index-request-dto";
import { StockMarketIndexResponseDto } from "@/application/dtos/stock-market-index-dto/stock-market-index-response-dto";

export class PrismaCreateStockMarketIndexRepository implements ICreateMarketIndexRepository {
  async create({ code, opensAt, closesAt }: StockMarketIndexRequestDto): Promise<StockMarketIndexResponseDto> {
    try {
      const client = Client.getInstance();
      const stockMarketIndexResponse = await client.stockMarketIndex.create({
        data: {
          code,
          opensAt,
          closesAt
        }
      });
      return stockMarketIndexResponse;
    } catch {
      return null;
    }
  }
}