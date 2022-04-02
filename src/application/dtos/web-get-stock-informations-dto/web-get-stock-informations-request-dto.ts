export type WebGetStockInformationsRequestDTO = {
  code: string;
  time_series?: 'TIME_SERIES_DAILY' | 'TIME_SERIES_MONTHLY'
}