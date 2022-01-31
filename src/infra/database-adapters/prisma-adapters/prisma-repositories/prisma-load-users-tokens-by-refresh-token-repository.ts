import { PrismaClient } from '@prisma/client';

import { ILoadUsersTokensByRefreshTokenRepository } from "@/application/infra-protocols/db/load-users-tokens-by-refresh-token-repository";
import { ISession } from "@/domain/entities/session";

export class PrismaLoadUsersTokensByRefreshTokenRepository implements ILoadUsersTokensByRefreshTokenRepository {
  async loadByRefreshToken(refreshToken: string): Promise<ISession> {
    const client = new PrismaClient();
    const usersTokens = await client.usersTokens.findFirst({
      where: {
        refreshToken
      }
    });

    await client.$disconnect();

    if (!usersTokens) {
      return null;
    };

    return {
      id: usersTokens.id,
      refreshToken: usersTokens.refreshToken,
    }
  }
}