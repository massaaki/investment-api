// import { PrismaClient } from "@prisma/client";
import { Client } from '../client'
import { IDeleteUsersTokensByIdRepository } from "@/application/infra-protocols/db/delete-users-tokens-by-id-repository";

export class PrismaDeleteUsersByIdRepository implements IDeleteUsersTokensByIdRepository {
  async deleteById(id: string): Promise<void> {
    const client = Client.getInstance();

    await client.usersTokens.delete({
      where: {
        id
      }
    });

    // await client.$disconnect();
  }

}