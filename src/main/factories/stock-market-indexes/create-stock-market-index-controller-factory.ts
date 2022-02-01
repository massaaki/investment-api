import { DbCreateStockMarketIndex } from "@/application/use-cases-implementations/stock-market-index/db-create-stock-market-index/db-create-stock-market-index";
import { PrismaCreateStockMarketIndexRepository } from "@/infra/database-adapters/prisma-adapters/prisma-repositories/stock-market-index-repositories/prisma-create-stock-market-index-repository";
import { PrismaLoadStockMarketIndexByCodeRepository } from "@/infra/database-adapters/prisma-adapters/prisma-repositories/stock-market-index-repositories/prisma-load-stock-market-index-by-code-repository";
import { CreateStockMarketIndexController } from "@/presentation/controllers/users/stock-market-index/create-stock-market-index-controller";
import { IController } from "@/presentation/protocols/controller";

export const makeStockMarketIndexControllerFactory = (): IController => {
  const createStockMarketIndexRepository = new PrismaCreateStockMarketIndexRepository()
  const loadStockMarketIndexByCodeRepository = new PrismaLoadStockMarketIndexByCodeRepository()
  const dbCreateStockmarketIndex = new DbCreateStockMarketIndex(loadStockMarketIndexByCodeRepository, createStockMarketIndexRepository)

  const createStockMarketIndexController = new CreateStockMarketIndexController(dbCreateStockmarketIndex);
  return createStockMarketIndexController;
}