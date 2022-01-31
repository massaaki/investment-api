import { ITokenDecrypter } from "@/application/infra-protocols/criptography/token-decrypter";
import { ITokenEncrypter } from "@/application/infra-protocols/criptography/token-encrypter";
import { ICreateUsersTokensRepository } from "@/application/infra-protocols/db/create-users-tokens-repository";
import { IDeleteUsersTokensByIdRepository } from "@/application/infra-protocols/db/delete-users-tokens-by-id-repository";
import { ILoadUserByIdRepository } from "@/application/infra-protocols/db/load-user-by-id-repository";
import { ILoadUsersTokensByRefreshTokenRepository } from "@/application/infra-protocols/db/load-users-tokens-by-refresh-token-repository";
import { ISession } from "@/domain/entities/session";
import { IRenewRefreshToken } from "@/domain/use-cases-protocols/session/renew-refresh-token";

export class DbRenewRefreshToken implements IRenewRefreshToken {

  constructor(
    private readonly tokenDecrypter: ITokenDecrypter,
    private readonly loadUserByIdRepository: ILoadUserByIdRepository,
    private readonly loadUsersTokensByRefreshTokenRepository: ILoadUsersTokensByRefreshTokenRepository,
    private readonly deleteUsersTokensByIdRepository: IDeleteUsersTokensByIdRepository,
    private readonly tokenEncrypter: ITokenEncrypter,
    private readonly createUsersTokensRepository: ICreateUsersTokensRepository
  ) {}

  async renew(refreshToken: string): Promise<ISession> {

    // decript referesh token and verify if is valid
    const response = await this.tokenDecrypter.decrypt(refreshToken);

    // returns null if token is invalid
    if (!response) {
      return null;
    }

    const { id } = response;
    const user = await this.loadUserByIdRepository.loadById(id);

    // user not found
    if (!user) {
      return null;
    }

    const usersTokens = await this.loadUsersTokensByRefreshTokenRepository.loadByRefreshToken(refreshToken);
    // refreshtoken not found
    if (!usersTokens) {
      return null;
    }

    // delete old refreshToken
    await this.deleteUsersTokensByIdRepository.deleteById(usersTokens.id);

    // create a new token
    const newToken = await this.tokenEncrypter.generate(user.id, 15);

    // create a new refreshToken
    const newRefreshToken = await this.tokenEncrypter.generate(user.id, 60 * 24 * 7);
    let expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Save in Database
    await this.createUsersTokensRepository.create({
      userId: user.id,
      refreshToken: newRefreshToken,
      expiresAt
    })

    return {
      id: user.id,
      token: newToken,
      refreshToken: newRefreshToken
    };
  }

}