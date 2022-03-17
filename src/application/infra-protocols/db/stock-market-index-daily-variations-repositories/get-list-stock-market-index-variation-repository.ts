import { IStockMarketIndexDailyVariation } from "@/domain/entities/stock-market-index"

export type GetStockMarketIndexVariationRepositoryResponseDto = IStockMarketIndexDailyVariation[]

export interface IGetStockMarketIndexVariationRepository {
  getByCode(code: string): Promise<GetStockMarketIndexVariationRepositoryResponseDto>
}