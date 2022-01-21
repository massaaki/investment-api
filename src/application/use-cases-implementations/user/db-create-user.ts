import { IHasher } from "@/application/protocols/criptography/hasher";
import { ICreateUserRepository } from "@/application/protocols/db/create-user-repository";
import { IUser } from "@/domain/entities/user";
import {
  CreateUserProps,
  ICreateUser,
} from "@/domain/use-cases-protocols/user/create-user";

export class DbCreateUser implements ICreateUser {
  constructor(
    private readonly encrypter: IHasher,
    private readonly createUserRepository: ICreateUserRepository
  ) {}

  async create(user: CreateUserProps): Promise<IUser> {
    await this.encrypter.hash(user.password);

    await this.createUserRepository.create(user);

    return new Promise((resolve) => resolve(null));
  }
}
