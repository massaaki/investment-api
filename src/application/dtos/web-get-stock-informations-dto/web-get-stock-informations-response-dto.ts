
export type StockInformation = {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  date?: Date;
}

export type WebGetStockInformationsResponseDTO = {
  code: string;
  history: StockInformation[];
}