export interface IStockMarketCompany {
  id: string
  name: string
  code: string
}

export interface IStockMarketCompanyValue {
  id?: string
  value?: number
  min?: number
  max?: number
}