import { DbAuthenticate } from "@/application/use-cases-implementations/session/db-autenticate/db-authenticate";
import { HashComparer } from "@/infra/cryptography-adapters/bcrypt-adapter/hash-comparer/hash-comparer";
import { TokenEncrypterAdapter } from "@/infra/cryptography-adapters/jwt-adapter/token-encrypter/token-encrypter-adapter";
import { PrismaLoadUserByEmailRepository } from "@/infra/database-adapters/prisma-adapters/prisma-repositories/prisma-load-user-by-email-repository";
import { LoginController } from "@/presentation/controllers/users/login/login-controller";

import { IController } from "@/presentation/protocols/controller";

import { env } from '@/main/config/env';
import { PrismaCreateUsersTokensRepository } from "@/infra/database-adapters/prisma-adapters/prisma-repositories/prisma-create-users-tokens-repository";

export const makeLoginControllerFactory = (): IController => {

  const createUsersTokensRepository = new PrismaCreateUsersTokensRepository();
  const token = new TokenEncrypterAdapter(env.jwtSecret);
  const hashComparer = new HashComparer();
  const loadUserByEmailRepository = new PrismaLoadUserByEmailRepository();

  const dbAuthenticate = new DbAuthenticate(
    loadUserByEmailRepository,
    hashComparer,
    token,
    createUsersTokensRepository);

  const loginController = new LoginController(dbAuthenticate);

  return loginController;
}