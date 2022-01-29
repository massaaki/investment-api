import { DbCreateUser } from "@/application/use-cases-implementations/user/db-create-user";
import { HashAdapter } from "@/infra/cryptography-adapters/bcrypt-adapter/hash/hash-adapter";
import { PrismaCreateUserRepository } from "@/infra/database-adapters/prisma-adapters/prisma-repositories/prisma-create-user-repository";
import { PrismaLoadUserByEmailRepository } from "@/infra/database-adapters/prisma-adapters/prisma-repositories/prisma-load-user-by-email-repository";
import { SignupController } from "@/presentation/controllers/users/signup/signup-controller";
import { IController } from "@/presentation/protocols/controller";

export const makeSignupControllerFactory = (): IController => {
  const hashAdapter = new HashAdapter();
  const createUserRepository = new PrismaCreateUserRepository();
  const loadUserByEmailRepository = new PrismaLoadUserByEmailRepository();


  const dbCreateUser = new DbCreateUser(hashAdapter, createUserRepository, loadUserByEmailRepository);
  const signupController = new SignupController(dbCreateUser);

  return signupController;
}