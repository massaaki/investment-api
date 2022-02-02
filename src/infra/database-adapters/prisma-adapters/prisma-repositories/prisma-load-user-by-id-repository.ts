// import { PrismaClient } from '@prisma/client';
import { Client } from '../client'

import { IUser } from "@/domain/entities/user";
import { ILoadUserByIdRepository } from '@/application/infra-protocols/db/load-user-by-id-repository';

export class PrismaLoadUserByIdRepository
  implements ILoadUserByIdRepository {

  async loadById(id: string): Promise<IUser> {
    const client = Client.getInstance();

    const user = await client.user.findFirst({
      where: {
        id
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
