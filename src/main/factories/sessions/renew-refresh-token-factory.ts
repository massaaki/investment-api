import { DbRenewRefreshToken } from "@/application/use-cases-implementations/session/renew-refresh-token/db-renew-refresh-token";

import { TokenDecrypterAdapter } from "@/infra/cryptography-adapters/jwt-adapter/token-decrypter/token-decrypter-adapter";
import { TokenEncrypterAdapter } from "@/infra/cryptography-adapters/jwt-adapter/token-encrypter/token-encrypter-adapter";
import { PrismaCreateUsersTokensRepository } from "@/infra/database-adapters/prisma-adapters/prisma-repositories/prisma-create-users-tokens-repository";
import { PrismaDeleteUsersByIdRepository } from "@/infra/database-adapters/prisma-adapters/prisma-repositories/prisma-delete-users-tokens-by-id-repository";
import { PrismaLoadUserByIdRepository } from "@/infra/database-adapters/prisma-adapters/prisma-repositories/prisma-load-user-by-id-repository";
import { PrismaLoadUsersTokensByRefreshTokenRepository } from "@/infra/database-adapters/prisma-adapters/prisma-repositories/prisma-load-users-tokens-by-refresh-token-repository";

import { RenewRefreshTokenController } from "@/presentation/controllers/users/renew-refresh-token/renew-refresh-token-controller";
import { IController } from "@/presentation/protocols/controller";
import { env } from "@/main/config/env";

export const makeRenewRefreshTokenFactory = (): IController => {
  const tokenDecrypter = new TokenDecrypterAdapter(env.jwtSecret);
  const loadUserByIdRepository = new PrismaLoadUserByIdRepository();
  const loadUsersTokensByRefreshTokenRepository = new PrismaLoadUsersTokensByRefreshTokenRepository();
  const deleteUsersTokensByIdRepository = new PrismaDeleteUsersByIdRepository();
  const tokenEncrypter = new TokenEncrypterAdapter(env.jwtSecret);
  const createUsersTokensRepository = new PrismaCreateUsersTokensRepository();


  const dbRenewRefreshToken = new DbRenewRefreshToken(
    tokenDecrypter,
    loadUserByIdRepository,
    loadUsersTokensByRefreshTokenRepository,
    deleteUsersTokensByIdRepository,
    tokenEncrypter,
    createUsersTokensRepository
  );
  const renewRefreshTokenController = new RenewRefreshTokenController(dbRenewRefreshToken);

  return renewRefreshTokenController;
}