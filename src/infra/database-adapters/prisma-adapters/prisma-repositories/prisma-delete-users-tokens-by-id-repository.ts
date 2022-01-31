import { PrismaClient } from "@prisma/client";
import { IDeleteUsersTokensByIdRepository } from "@/application/infra-protocols/db/delete-users-tokens-by-id-repository";

export class PrismaDeleteUsersByIdRepository implements IDeleteUsersTokensByIdRepository {
  async deleteById(id: string): Promise<void> {
    const client = new PrismaClient();

    await client.usersTokens.delete({
      where: {
        id
      }
    });

    await client.$disconnect();
  }

}