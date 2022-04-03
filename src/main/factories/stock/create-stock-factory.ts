import { DbCreateStock } from "@/application/use-cases-implementations/stock/db-create-stock/db-create-stock";
import { PrismaCreateStock } from "@/infra/database-adapters/prisma-adapters/prisma-repositories/stock/prisma-create-stock";
import { WebRequestStockInformations } from "@/infra/web-request-adapters/axios/web-request-stock-informations";
import { CreateStockController } from "@/presentation/controllers/stock/create-stock-controller";
import { IController } from "@/presentation/protocols/controller";

export const makeCreateStockFactory = (): IController => {
  const webRequestStockInformations = new WebRequestStockInformations();
  const createStockRepository = new PrismaCreateStock()
  const dbCreateStock = new DbCreateStock(createStockRepository, webRequestStockInformations)
  const createStockController = new CreateStockController(dbCreateStock)
  
  return createStockController;
}