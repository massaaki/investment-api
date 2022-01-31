// import { PrismaClient } from "@prisma/client";
import { Client } from '../client'
import { CreateUsersTokensRequestDto } from "@/application/dtos/create-users-tokens-dto/create-users-tokens-request-dto";
import { ICreateUsersTokensRepository } from "@/application/infra-protocols/db/create-users-tokens-repository";

export class PrismaCreateUsersTokensRepository implements ICreateUsersTokensRepository {
  async create({ userId, refreshToken, expiresAt }: CreateUsersTokensRequestDto): Promise<void> {
    const client = Client.getInstance();
    await client.usersTokens.create({
      data: {
        userId,
        refreshToken,
        expiresAt
      }
    })
    // await client.$disconnect();
  }
}