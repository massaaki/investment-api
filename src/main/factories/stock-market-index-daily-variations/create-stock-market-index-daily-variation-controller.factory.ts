import { DbCreateStockMarketIndexDailyVariation } from "@/application/use-cases-implementations/stock-market-index/db-create-stock-market-index-daily-variation/db-create-stock-market-index-daily-variation";
import { PrismaCreateStockMarketIndexDailyVariationRepository } from "@/infra/database-adapters/prisma-adapters/prisma-repositories/stock-market-index-daily-variation-repositories/prisma-create-stock-market-index-daily-variation-repository";
import { PrismaLoadStockMarketIndexVariationDailyByCodeRepository } from "@/infra/database-adapters/prisma-adapters/prisma-repositories/stock-market-index-daily-variation-repositories/prisma-load-stock-market-index-variation-daily-by-code-repository";
import { PrismaUpdateStockMarketIndexDailyVariationRepository } from "@/infra/database-adapters/prisma-adapters/prisma-repositories/stock-market-index-daily-variation-repositories/prisma-update-stock-market-index-daily-variation-repository";
import { PrismaLoadStockMarketIndexByCodeRepository } from "@/infra/database-adapters/prisma-adapters/prisma-repositories/stock-market-index-repositories/prisma-load-stock-market-index-by-code-repository";
import { CrawlerFindStockIndexValueAdapter } from "@/infra/web-crawler-adapters/puppeteer-adapter/crawler-find-stock-index-value-adapter";
import { WebRequestStockInformations } from "@/infra/web-request-adapters/axios/web-request-stock-informations";
import { CreateStockMarketIndexDailyVariationController } from "@/presentation/controllers/stock-market-index-daily-variation/create-stock-market-index-daily-variation-controller";
import { IController } from "@/presentation/protocols/controller";

export const makeCreateStockMarketIndexDailyVariationController = (): IController => {

  const webRequestStockInformations = new WebRequestStockInformations();

  const loadStockMarketIndexByCodeRepository = new PrismaLoadStockMarketIndexByCodeRepository();
  const loadStockMarketIndexDailyByCodeRepository = new PrismaLoadStockMarketIndexVariationDailyByCodeRepository();
  const createStockMarketIndexDailyVariationRepository = new PrismaCreateStockMarketIndexDailyVariationRepository();
  const updateStockMarketIndexDailyVariationRepository = new PrismaUpdateStockMarketIndexDailyVariationRepository();
  const crawlerFindStockIndexValueAdapter = new CrawlerFindStockIndexValueAdapter();

  const createStockMarketIndexDailyVariation = new DbCreateStockMarketIndexDailyVariation(
    loadStockMarketIndexByCodeRepository,
    loadStockMarketIndexDailyByCodeRepository,
    createStockMarketIndexDailyVariationRepository,
    updateStockMarketIndexDailyVariationRepository,
    crawlerFindStockIndexValueAdapter,
    webRequestStockInformations
  );

  const createStockMarketIndexDailyVariationController = new CreateStockMarketIndexDailyVariationController(createStockMarketIndexDailyVariation);

  return createStockMarketIndexDailyVariationController;
}