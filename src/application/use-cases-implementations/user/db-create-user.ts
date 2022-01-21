import { IHasher } from "@/application/protocols/criptography/hasher";
import { IUser } from "@/domain/entities/user";
import {
  CreateUserProps,
  ICreateUser,
} from "@/domain/use-cases-protocols/user/create-user";

export class DbCreateAccount implements ICreateUser {
  constructor(private readonly encrypter: IHasher) {}

  async create(account: CreateUserProps): Promise<IUser> {
    await this.encrypter.hash(account.password);

    return new Promise((resolve) => resolve(null));
  }
}
