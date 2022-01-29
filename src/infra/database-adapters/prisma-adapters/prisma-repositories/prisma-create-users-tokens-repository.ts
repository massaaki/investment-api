import { PrismaClient } from "@prisma/client";
import { CreateUsersTokensRequestDto } from "@/application/dtos/create-users-tokens-dto/create-users-tokens-request-dto";
import { ICreateUsersTokensRepository } from "@/application/infra-protocols/db/create-users-tokens-repository";

export class PrismaCreateUsersTokensRepository implements ICreateUsersTokensRepository {
  async create({ userId, refreshToken, expiresAt }: CreateUsersTokensRequestDto): Promise<void> {
    const client = new PrismaClient();
    await client.usersTokens.create({
      data: {
        id: userId,
        refreshToken,
        expiresAt
      }
    })
  }
}