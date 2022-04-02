import { IStock } from "@/domain/entities/stock";

export type CreateStockRepositoryRequestDto = Omit<IStock, 'id'>;

export interface ICreateStockRepository {
  create(request: CreateStockRepositoryRequestDto): Promise<IStock>;
}