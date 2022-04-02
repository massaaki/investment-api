import { IStock } from "@/domain/entities/stock";

export type CreateStockRepositoryRequestDto = {
  code: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
}

export interface ICreateStockRepository {
  create(request: CreateStockRepositoryRequestDto): Promise<IStock>;
}