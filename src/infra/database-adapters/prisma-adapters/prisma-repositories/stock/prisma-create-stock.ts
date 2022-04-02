import {Client} from '../../client'

import { CreateStockRepositoryRequestDto, ICreateStockRepository } from "@/application/infra-protocols/db/stock/create-stock-repository";
import { IStock } from "@/domain/entities/stock";

export class PrismaCreateStock implements ICreateStockRepository {
  async create(request: CreateStockRepositoryRequestDto): Promise<IStock> {
    if(!request){
      return null;
    }

    const {code, history} = request;
    const client = Client.getInstance();

    const stockDatas = history.map((stock) => ({
      code,
      value: stock.close,
      min: stock.low,
      max: stock.high,
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