import { TokenDecrypterResponseDto } from "@/application/dtos/token-decrypter-dto/token-decrypter-response-dto";
import { ITokenDecrypter } from "@/application/infra-protocols/criptography/token-decrypter";
import { IRenewRefreshToken } from "@/domain/use-cases-protocols/session/renew-refresh-token";
import { DbRenewRefreshToken } from "./db-renew-refresh-token";




const makeFakeResponse = (): TokenDecrypterResponseDto => ({
  id: 'any_id',
  token: 'any_token',
  refreshToken: 'any_refresh_token'
})

const makeTokenDecrypterStub = () => {
  class TokenDecrypterStub implements ITokenDecrypter {
    async decrypt(token: string): Promise<TokenDecrypterResponseDto> {
      return new Promise(resolve => resolve(makeFakeResponse()));
    }
  }
  return new TokenDecrypterStub();
}

type makeSutType = {
  sut: IRenewRefreshToken;
  tokenDecrypterStub: ITokenDecrypter;
}
const makeSut = (): makeSutType => {
  const tokenDecrypterStub = makeTokenDecrypterStub();
  const sut = new DbRenewRefreshToken(tokenDecrypterStub);


  return {
    sut,
    tokenDecrypterStub
  }

}

describe("## DbRenewRefreshToken Usecase", () => {

  /**
   * Check if dependences receives correct params
   */
  describe("Verify", () => {
    it('should call TokenDecrypter.decrypt with correct values', async () => {
      const { sut, tokenDecrypterStub } = makeSut();
      const decryptSpy = jest.spyOn(tokenDecrypterStub, 'decrypt');

      await sut.renew('any_refresh_token');
      expect(decryptSpy).toHaveBeenCalledWith('any_refresh_token');

    })



  });

  /**
   * Check if Refresh token has correctly behaviors
   */
  describe("RefreshToken", () => {

  });

  /**
   * Check if some dependence throws
   */
  describe("Throws", () => {

  });

})