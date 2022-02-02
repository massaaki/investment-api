import { DbCreateStockMarketIndexDailyVariation } from "@/application/use-cases-implementations/stock-market-index/db-create-stock-market-index-daily-variation/db-create-stock-market-index-daily-variation";
import { PrismaCreateStockMarketIndexDailyVariationRepository } from "@/infra/database-adapters/prisma-adapters/prisma-repositories/stock-market-index-daily-variation-repositories/prisma-create-stock-market-index-daily-variation-repository";
import { PrismaLoadStockMarketIndexVariationDailyByCodeRepository } from "@/infra/database-adapters/prisma-adapters/prisma-repositories/stock-market-index-daily-variation-repositories/prisma-load-stock-market-index-variation-daily-by-code-repository";
import { PrismaUpdateStockMarketIndexDailyVariationRepository } from "@/infra/database-adapters/prisma-adapters/prisma-repositories/stock-market-index-daily-variation-repositories/prisma-update-stock-market-index-daily-variation-repository";
import { PrismaLoadStockMarketIndexByCodeRepository } from "@/infra/database-adapters/prisma-adapters/prisma-repositories/stock-market-index-repositories/prisma-load-stock-market-index-by-code-repository";
import { CreateStockMarketIndexDailyVariationController } from "@/presentation/controllers/stock-market-index-daily-variation/create-stock-market-index-daily-variation-controller";
import { IController } from "@/presentation/protocols/controller";

export const makeCreateStockMarketIndexDailyVariationController = (): IController => {
  const loadStockMarketIndexByCodeRepository = new PrismaLoadStockMarketIndexByCodeRepository();
  const loadStockMarketIndexDailyByCodeRepository = new PrismaLoadStockMarketIndexVariationDailyByCodeRepository();
  const createStockMarketIndexDailyVariationRepository = new PrismaCreateStockMarketIndexDailyVariationRepository();
  const updateStockMarketIndexDailyVariationRepository = new PrismaUpdateStockMarketIndexDailyVariationRepository()

  const createStockMarketIndexDailyVariation = new DbCreateStockMarketIndexDailyVariation(
    loadStockMarketIndexByCodeRepository,
    loadStockMarketIndexDailyByCodeRepository,
    createStockMarketIndexDailyVariationRepository,
    updateStockMarketIndexDailyVariationRepository
  );

  const createStockMarketIndexDailyVariationController = new CreateStockMarketIndexDailyVariationController(createStockMarketIndexDailyVariation);

  return createStockMarketIndexDailyVariationController;
}