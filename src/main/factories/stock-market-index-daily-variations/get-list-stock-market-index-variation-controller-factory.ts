import { DbListStockMarketIndexVariation } from "@/application/use-cases-implementations/stock-market-index/db-list-stock-market-index-variation/db-list-stock-market-index-variation";
import { PrismaGetListStockMarketIndexVariationRepository } from "@/infra/database-adapters/prisma-adapters/prisma-repositories/stock-market-index-repositories/prisma-get-list-stock-market-index-variation-repository";
import { GetListStockMarketIndexVariationController } from "@/presentation/controllers/stock-market-index-daily-variation/get-list-stock-market-index-variation-controller";
import { IController } from "@/presentation/protocols/controller";

export const makeGetListStockMarketIndexVariationControllerFactory = (): IController => {
  const getListStockMarketIndexVariationRepository = new PrismaGetListStockMarketIndexVariationRepository()
  const dbGetListStockMarketIndexVariation = new DbListStockMarketIndexVariation(getListStockMarketIndexVariationRepository)

  const controller = new GetListStockMarketIndexVariationController(dbGetListStockMarketIndexVariation);

  return controller;
}