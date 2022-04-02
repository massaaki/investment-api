import {Client} from '../../client'

import { CreateStockRepositoryRequestDto, ICreateStockRepository } from "@/application/infra-protocols/db/stock/create-stock-repository";

export class PrismaCreateStock implements ICreateStockRepository {
  async create(request: CreateStockRepositoryRequestDto): Promise<void> {
    if(!request){
      return null;
    }

    const {code, history} = request;
    const client = Client.getInstance();

    const stockDatas = history.map((stock) => ({
      code,
      open: stock.open,
      close: stock.close,
      high: stock.low,
      low: stock.high,
      volume: stock.volume,
      created_at: stock.date
    }))


    await client.stock.createMany({
      data: stockDatas,
      skipDuplicates: true
    })

    return null;
  }
}