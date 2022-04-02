import {Client} from '../../client'

import { CreateStockRepositoryRequestDto, ICreateStockRepository } from "@/application/infra-protocols/db/stock/create-stock-repository";
import { IStock } from "@/domain/entities/stock";

export class PrismaCreateStock implements ICreateStockRepository {
  async create(request: CreateStockRepositoryRequestDto): Promise<IStock> {
    if(!request){
      return null;
    }

    const {code, close, high, low, open, volume} = request;
    const client = Client.getInstance();

    const response = await client.stock.create({
      data: {
        close, code, high, low, open, volume
      }
    })

    return response;
  }
}