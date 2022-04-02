export type CreateStockRequest = {
  code: string
}

export interface ICreateStock {
  create(request: CreateStockRequest): Promise<void>;
}