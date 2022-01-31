import { PrismaClient } from '@prisma/client';

import { CreateUserRequestDTO } from "@/application/dtos/create-user-dto/create-user-request-dto";
import { CreateUserResponseDTO } from "@/application/dtos/create-user-dto/create-user-response-dto";
import { ICreateUserRepository } from "@/application/infra-protocols/db/create-user-repository";

export class PrismaCreateUserRepository
  implements ICreateUserRepository {

  constructor() {
  }

  async create(userData: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    const client = new PrismaClient();
    const { name, email, password } = userData;

    const newUser = await client.user.create({
      data: {
        name,
        email,
        hashed_password: password
      }
    })

    await client.$disconnect();

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      password: newUser.hashed_password
    }
  }
}
