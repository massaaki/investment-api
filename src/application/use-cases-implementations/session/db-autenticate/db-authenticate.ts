import { IHashComparer } from "@/application/infra-protocols/criptography/hash-comparer";
import { ITokenEncrypter } from "@/application/infra-protocols/criptography/token-encrypter";
import { ICreateUsersTokensRepository } from "@/application/infra-protocols/db/create-users-tokens-repository";
import { ILoadUserByEmailRepository } from "@/application/infra-protocols/db/load-user-by-email-repository";
import { ISession } from "@/domain/entities/session";
import { AuthenticateProps, IAuthenticate } from "@/domain/use-cases-protocols/session/authenticate";

export class DbAuthenticate implements IAuthenticate {

  constructor(
    private readonly loadUserByEmailRepository: ILoadUserByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly tokenEncrypter: ITokenEncrypter,
    private readonly createUsersTokensRepository: ICreateUsersTokensRepository
  ) {}


  async auth(data: AuthenticateProps): Promise<ISession> {

    if (!data) {
      return null;
    }

    const { email, password } = data;
    const user = await this.loadUserByEmailRepository.loadByEmail(email);

    if (!user) {
      return null;
    }


    const { password: hashedPassword } = user;
    const isPasswordMatch = await this.hashComparer.compare(password, hashedPassword);

    if (!isPasswordMatch) {
      return null;
    }
    const newToken = await this.tokenEncrypter.generate(user.id, 15); // 15min
    const newRefreshToken = await this.tokenEncrypter.generate(user.id, 60 * 24 * 7); // 7 days

    let expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.createUsersTokensRepository.create({
      userId: user.id,
      expiresAt,
      refreshToken: newRefreshToken
    })

    return {
      id: user.id,
      token: newToken,
      refreshToken: newRefreshToken
    }
  }

}