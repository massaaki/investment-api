import { PrismaClient } from '@prisma/client';

import { ILoadUserByEmailRepository } from "@/application/infra-protocols/db/load-user-by-email-repository";
import { IUser } from "@/domain/entities/user";

export class PrismaLoadUserByEmailRepository
  implements ILoadUserByEmailRepository {

  async loadByEmail(email: string): Promise<IUser> {
    const client = new PrismaClient();

    const user = await client.user.findFirst({
      where: {
        email: email
      }
    });

    await client.$disconnect();

    if (!user)
      return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.hashed_password
    }
  }
}
