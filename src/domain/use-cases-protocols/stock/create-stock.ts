export type CreateStockRequest = {
  value: number;
  min: number;
  max: number;
  volume: number;
}

export interface ICreateStock {
  create(request: CreateStockRequest): Promise<void>;
}