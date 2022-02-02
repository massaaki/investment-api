import { DbInfoUser } from "@/application/use-cases-implementations/user/db-info-user";
import { PrismaLoadUserByIdRepository } from "@/infra/database-adapters/prisma-adapters/prisma-repositories/prisma-load-user-by-id-repository";
import { InfoControler } from "@/presentation/controllers/users/info/info-controller";
import { IController } from "@/presentation/protocols/controller";

export const makeInfoUserControllerFactory = (): IController => {
  const loadUserByIdRepository = new PrismaLoadUserByIdRepository()
  const dbInfoUser = new DbInfoUser(loadUserByIdRepository);

  const controller = new InfoControler(dbInfoUser);
  return controller;
}