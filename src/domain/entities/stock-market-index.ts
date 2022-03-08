export interface IStockMarketIndex {
  id: string
  code: string
  opensAt: string
  closesAt: string
}

export interface IStockMarketIndexDailyVariation {
  id?: string
  value?: number
  min?: number
  max?: number
  volume?: number
  isOpened?: boolean
  date?: Date
}