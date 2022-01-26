import { IHasher } from "@/application/infra-protocols/criptography/hasher";
import { ICreateUserRepository } from "@/application/infra-protocols/db/create-user-repository";
import { ILoadUserByEmailRepository } from "@/application/infra-protocols/db/load-user-by-email-repository";
import { IUser } from "@/domain/entities/user";
import {
  CreateUserProps,
  ICreateUser,
} from "@/domain/use-cases-protocols/user/create-user";

export class DbCreateUser implements ICreateUser {
  constructor(
    private readonly encrypter: IHasher,
    private readonly createUserRepository: ICreateUserRepository,
    private readonly loadUserByEmailRepository: ILoadUserByEmailRepository
  ) {}

  async create(user: CreateUserProps): Promise<IUser> {

    const userExists = await this.loadUserByEmailRepository.loadByEmail(
      user.email
    );

    if (userExists) return null;

    const hashedPassword = await this.encrypter.hash(user.password);

    const newUser = await this.createUserRepository.create({
      ...user,
      password: hashedPassword,
    });

    return newUser;
  }
}
