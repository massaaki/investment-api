import { ICreateStockRepository } from "@/application/infra-protocols/db/stock/create-stock-repository";
import { IStock } from "@/domain/entities/stock";
import { CreateStockRequest, ICreateStock } from "@/domain/use-cases-protocols/stock/create-stock";

export class DbCreateStock implements ICreateStock {
  constructor(private readonly createStockRepository: ICreateStockRepository) {}

  async create(request: CreateStockRequest): Promise<IStock> {
    if (!request) {
      return null;
    }

    const { close, code, high, low, open, volume } = request;

    const response = await this.createStockRepository.create({
      close, code, high, low, open, volume
    });

    return response;
  }
}