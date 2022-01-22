import {
  CreateUserProps,
  ICreateUserRepository,
} from "@/application/infra-protocols/db/create-user-repository";
import { IUser } from "@/domain/entities/user";
import { getRepository, Repository } from "typeorm";
import { User } from "../../typeorm-entities/typeorm-user";


export class TypeormPostgresCreateUserRepository
  implements ICreateUserRepository {
  private repository: Repository<User>;

  constructor() {
    // this.repository = getRepository(TypeormUser);
  }


  async create(userData: CreateUserProps): Promise<IUser> {

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
