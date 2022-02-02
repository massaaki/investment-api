// import { PrismaClient } from '@prisma/client';
import { Client } from '../client'

import { ILoadUserByEmailRepository } from "@/application/infra-protocols/db/load-user-by-email-repository";
import { IUser } from "@/domain/entities/user";

export class PrismaLoadUserByEmailRepository
  implements ILoadUserByEmailRepository {

  async loadByEmail(email: string): Promise<IUser> {
    const client = Client.getInstance();

    const user = await client.user.findFirst({
      where: {
        email: email
      }
    });

    // await client.$disconnect();

    if (!user)
      return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.is_admin,
      password: user.hashed_password
    }
  }
}
