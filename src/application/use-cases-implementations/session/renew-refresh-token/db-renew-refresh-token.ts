import { ITokenDecrypter } from "@/application/infra-protocols/criptography/token-decrypter";
import { ISession } from "@/domain/entities/session";
import { IRenewRefreshToken } from "@/domain/use-cases-protocols/session/renew-refresh-token";

export class DbRenewRefreshToken implements IRenewRefreshToken {

  constructor(
    private readonly tokenDecrypter: ITokenDecrypter
  ) {}

  async renew(refreshToken: string): Promise<ISession> {

    await this.tokenDecrypter.decrypt(refreshToken);


    // decript referesh token
    // verifica se token eh valido
    // verifica se refreshtoken expirou

    // loadUserByRefreshToken
    // verifica se refreshtoken existe

    // deleta refreshToken antigo

    // cria um novo token
    // cria um novo refreshToken
    // Salva refreshToken no db

    //returna

    return null;
  }

}