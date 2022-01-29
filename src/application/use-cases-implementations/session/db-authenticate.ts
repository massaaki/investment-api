import { IHashComparer } from "@/application/infra-protocols/criptography/hash-comparer";
import { IToken } from "@/application/infra-protocols/criptography/token";
import { ICreateUsersTokensRepository } from "@/application/infra-protocols/db/create-users-tokens-repository";
import { ILoadUserByEmailRepository } from "@/application/infra-protocols/db/load-user-by-email-repository";
import { ISession } from "@/domain/entities/session";
import { AuthenticateProps, IAuthenticate } from "@/domain/use-cases-protocols/session/authenticate";

export class DbAuthenticate implements IAuthenticate {

  constructor(
    private readonly loadUserByEmailRepository: ILoadUserByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly token: IToken,
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

    const newToken = await this.token.generate(user.id, 15); // 15min
    const newRefreshToken = await this.token.generate(user.id, 60 * 24 * 7); // 7 days

    await this.createUsersTokensRepository.create({
      userId: user.id,
      expires_at: new Date(),
      refreshToken: newRefreshToken
    })

    return {
      id: user.id,
      token: newToken,
      refreshToken: newRefreshToken
    }
  }

}