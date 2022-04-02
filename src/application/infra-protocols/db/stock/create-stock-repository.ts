import { IStock } from "@/domain/entities/stock";


export type stock= {
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  date?: Date;
}

export type CreateStockRepositoryRequestDto = {
  code: string;
  history: stock[];
}

export interface ICreateStockRepository {
  create({code, history}: CreateStockRepositoryRequestDto): Promise<void>;
}