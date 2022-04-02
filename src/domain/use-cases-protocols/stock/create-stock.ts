import { IStock } from "@/domain/entities/stock";

export type CreateStockRequest = Omit<IStock, "id">

export interface ICreateStock {
  create(request: CreateStockRequest): Promise<IStock>;
}