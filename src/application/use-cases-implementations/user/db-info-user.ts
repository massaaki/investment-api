import { ILoadUserByIdRepository } from "@/application/infra-protocols/db/load-user-by-id-repository";
import { IUser } from "@/domain/entities/user";
import { IInfoUser } from "@/domain/use-cases-protocols/user/info-user";

export class DbInfoUser implements IInfoUser {
  constructor(
    private readonly loadUserByIdRepository: ILoadUserByIdRepository
  ) {}

  async me(id: string): Promise<IUser> {
    const user = await this.loadUserByIdRepository.loadById(id)

    if (!user) {
      return null;
    }

    return user;
  }

}