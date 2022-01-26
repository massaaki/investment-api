import { getRepository, Repository } from "typeorm";

import { CreateUserRequestDTO } from "@/application/dtos/create-user-request-dto";
import { CreateUserResponseDTO } from "@/application/dtos/create-user-response-dto";
import { ICreateUserRepository } from "@/application/infra-protocols/db/create-user-repository";

import { User } from "../../typeorm-entities/typeorm-user";

export class TypeormPostgresCreateUserRepository
  implements ICreateUserRepository {
  private repository: Repository<User>;

  constructor() {
    // this.repository = getRepository(TypeormUser);
  }

  async create(userData: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {

    this.repository = getRepository(User);

    const user = this.repository.create({
      name: userData.name,
      email: userData.email,
      hashed_password: userData.password,
    })

    await this.repository.save(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.hashed_password
    }
  }
}
