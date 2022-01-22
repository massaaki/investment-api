import { ILoadUserByEmailRepository } from "@/application/infra-protocols/db/load-user-by-email-repository";
import { IUser } from "@/domain/entities/user";
import { getRepository, Repository } from "typeorm";
import { User } from "../../typeorm-entities/typeorm-user";


export class TypeormPostgresLoadUserByEmailRepository
  implements ILoadUserByEmailRepository {
  private repository: Repository<User>;

  async loadByEmail(email: string): Promise<IUser> {
    this.repository = getRepository(User);

    const user = await this.repository.findOne({
      where: { email }
    });

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
