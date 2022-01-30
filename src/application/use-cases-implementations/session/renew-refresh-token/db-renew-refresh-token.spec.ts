import { CreateUsersTokensRequestDto } from "@/application/dtos/create-users-tokens-dto/create-users-tokens-request-dto";
import { CreateUsersTokensResponseDto } from "@/application/dtos/create-users-tokens-dto/create-users-tokens-response-dto";
import { TokenDecrypterResponseDto } from "@/application/dtos/token-decrypter-dto/token-decrypter-response-dto";
import { ITokenDecrypter } from "@/application/infra-protocols/criptography/token-decrypter";
import { ITokenEncrypter } from "@/application/infra-protocols/criptography/token-encrypter";
import { ICreateUsersTokensRepository } from "@/application/infra-protocols/db/create-users-tokens-repository";
import { IDeleteUsersTokensByIdRepository } from "@/application/infra-protocols/db/delete-users-tokens-by-id-repository";
import { ILoadUserByIdRepository } from "@/application/infra-protocols/db/load-user-by-id-repository";
import { ILoadUsersTokensByRefreshTokenRepository } from "@/application/infra-protocols/db/load-users-tokens-by-refresh-token-repository";
import { ISession } from "@/domain/entities/session";
import { IUser } from "@/domain/entities/user";
import { IRenewRefreshToken } from "@/domain/use-cases-protocols/session/renew-refresh-token";
import { DbRenewRefreshToken } from "./db-renew-refresh-token";


const makeFakeResponse = (): TokenDecrypterResponseDto => ({
  id: 'any_id',
  expiresAt: new Date(),
});


const makeFakeUser = (): IUser => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'any_password'
})

const makeFakeSession = (): ISession => ({
  id: 'any_id',
  refreshToken: 'any_refresh_token'
})


const makeCreateUsersTokensRepositoryStub = () => {
  class CreateUsersTokensRepositoryStub implements ICreateUsersTokensRepository {
    create(data: CreateUsersTokensRequestDto): Promise<CreateUsersTokensResponseDto> {
      return new Promise(resolve => resolve());
    }
  }
  return new CreateUsersTokensRepositoryStub();
}


const makeTokenEncrypterStub = () => {
  class TokenEncrypterStub implements ITokenEncrypter {
    async generate(userId: string, expiresInMinutes: number): Promise<string> {
      return new Promise(resolve => resolve('any-token'));
    }
  }
  return new TokenEncrypterStub();
}


const makeDeleteUsersTokensByIdRepositoryStub = () => {
  class DeleteUsersTokensByIdRepositoryStub implements IDeleteUsersTokensByIdRepository {
    async deleteById(id: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new DeleteUsersTokensByIdRepositoryStub();
}


const makeLoadUserByTokenRepositoryStub = () => {
  class LoadUsersTokensByRefreshTokenRepositoryStub implements ILoadUsersTokensByRefreshTokenRepository {
    async loadByRefreshToken(refreshToken: string): Promise<ISession> {
      return new Promise(resolve => resolve(makeFakeSession()));
    }
  }
  return new LoadUsersTokensByRefreshTokenRepositoryStub();

}


const makeLoadUserByIdRepositoryStub = () => {
  class LoadUserByIdRepositoryStub implements ILoadUserByIdRepository {
    async loadById(id: string): Promise<IUser> {
      return new Promise(resolve => resolve(makeFakeUser()));
    }
  }
  return new LoadUserByIdRepositoryStub();
}


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
  loadUserByIdRepositoryStub: ILoadUserByIdRepository;
  loadUsersTokensByRefreshTokenStub: ILoadUsersTokensByRefreshTokenRepository;
  deleteUsersTokensByIdRepositoryStub: IDeleteUsersTokensByIdRepository;
  tokenEncrypterStub: ITokenEncrypter;
  createUsersTokensRepositoryStub: ICreateUsersTokensRepository;
}
const makeSut = (): makeSutType => {
  const tokenDecrypterStub = makeTokenDecrypterStub();
  const loadUserByIdRepositoryStub = makeLoadUserByIdRepositoryStub();
  const loadUsersTokensByRefreshTokenStub = makeLoadUserByTokenRepositoryStub();
  const deleteUsersTokensByIdRepositoryStub = makeDeleteUsersTokensByIdRepositoryStub();
  const tokenEncrypterStub = makeTokenEncrypterStub();
  const createUsersTokensRepositoryStub = makeCreateUsersTokensRepositoryStub();

  const sut = new DbRenewRefreshToken(
    tokenDecrypterStub,
    loadUserByIdRepositoryStub,
    loadUsersTokensByRefreshTokenStub,
    deleteUsersTokensByIdRepositoryStub,
    tokenEncrypterStub,
    createUsersTokensRepositoryStub

  );

  return {
    sut,
    tokenDecrypterStub,
    loadUserByIdRepositoryStub,
    loadUsersTokensByRefreshTokenStub,
    deleteUsersTokensByIdRepositoryStub,
    tokenEncrypterStub,
    createUsersTokensRepositoryStub
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
    });

    it('should call TokenDecrypter.decrypt with correct values', async () => {
      const { sut, tokenDecrypterStub } = makeSut();
      const decryptSpy = jest.spyOn(tokenDecrypterStub, 'decrypt');

      await sut.renew('any_refresh_token');
      expect(decryptSpy).toHaveBeenCalledWith('any_refresh_token');
    });

  });

  /**
   * Check if Refresh token has correctly behaviors
   */
  describe("RefreshToken", () => {


    it('should call tokenDencrypter.decrypt', async () => {
      const { sut, tokenDecrypterStub } = makeSut();
      const decryptSpy = jest.spyOn(tokenDecrypterStub, 'decrypt');

      await sut.renew('any_refresh_token');

      expect(decryptSpy).toHaveBeenCalled();
    })

    it('should return null if refreshToken is invalid ', async () => {
      const { sut, tokenDecrypterStub } = makeSut();
      jest.spyOn(tokenDecrypterStub, 'decrypt').mockReturnValueOnce(new Promise(resolve => resolve(null)));

      const response = await sut.renew('any_refresh_token');
      expect(response).toBeNull();
    });

    it('should return null if LoadUserByIdRepository.loadById does not found an user', async () => {
      const { sut, loadUserByIdRepositoryStub } = makeSut();
      jest.spyOn(loadUserByIdRepositoryStub, 'loadById').mockReturnValueOnce(new Promise(resolve => resolve(null)));

      const response = await sut.renew('any_refresh_token');

      expect(response).toBeNull();
    });

    it('should return null if loadUsersTokensByRefreshTokenRepository.loadByRefreshToken doest not exists', async () => {
      const { sut, loadUsersTokensByRefreshTokenStub } = makeSut();
      jest.spyOn(loadUsersTokensByRefreshTokenStub, 'loadByRefreshToken').mockReturnValueOnce(new Promise(resolve => resolve(null)));

      const response = await sut.renew('any_refresh_token');

      expect(response).toBeNull();
    });

    it('should call deleteUsersTokensByIdRepository.deleteById', async () => {
      const { sut, deleteUsersTokensByIdRepositoryStub } = makeSut();
      const deleteById = jest.spyOn(deleteUsersTokensByIdRepositoryStub, 'deleteById');

      await sut.renew('any_refresh_token');

      expect(deleteById).toHaveBeenCalled();
    });

    it('should call tokenEncrypter.generate 2 times (token and refreshToken)', async () => {
      const { sut, tokenEncrypterStub } = makeSut();
      const generateSpy = jest.spyOn(tokenEncrypterStub, 'generate');

      await sut.renew('any_refresh_token');

      expect(generateSpy).toHaveBeenCalledTimes(2);
    });

    it('should return a session if createUsersTokensRepository.create succeeds', async () => {
      const { sut } = makeSut();


      const response = await sut.renew('any_refresh_token');

      expect(response).toEqual({
        id: 'any_id',
        token: 'any-token',
        refreshToken: 'any-token'
      })

    })


  });

  /**
   * Check if some dependence throws
   */
  describe("Throws", () => {
    it('should throw if tokenDecrypterStub.decrypt throws', async () => {
      const { sut, tokenDecrypterStub } = makeSut();
      jest.spyOn(tokenDecrypterStub, 'decrypt').mockImplementation(() => {
        throw new Error();
      })

      const promise = sut.renew('any_refresh_token');

      await expect(promise).rejects.toThrow();
    });

    it('should throw if loadUserByIdRepositoryStub.loadByid throws', async () => {
      const { sut, loadUserByIdRepositoryStub } = makeSut();
      jest.spyOn(loadUserByIdRepositoryStub, 'loadById').mockImplementation(() => {
        throw new Error();
      })

      const promise = sut.renew('any_refresh_token');

      await expect(promise).rejects.toThrow();
    });

    it('should throw if loadUsersTokensByRefreshTokenStub.loadByRefreshToken throws', async () => {
      const { sut, loadUsersTokensByRefreshTokenStub } = makeSut();
      jest.spyOn(loadUsersTokensByRefreshTokenStub, 'loadByRefreshToken').mockImplementation(() => {
        throw new Error();
      })

      const promise = sut.renew('any_refresh_token');

      await expect(promise).rejects.toThrow();
    });

    it('should throw if deleteUsersTokensByIdRepositoryStub.deleteById throws', async () => {
      const { sut, deleteUsersTokensByIdRepositoryStub } = makeSut();
      jest.spyOn(deleteUsersTokensByIdRepositoryStub, 'deleteById').mockImplementation(() => {
        throw new Error();
      })

      const promise = sut.renew('any_refresh_token');

      await expect(promise).rejects.toThrow();
    });

    it('should throw if tokenEncrypterStub.generate throws', async () => {
      const { sut, tokenEncrypterStub } = makeSut();
      jest.spyOn(tokenEncrypterStub, 'generate').mockImplementation(() => {
        throw new Error();
      })

      const promise = sut.renew('any_refresh_token');

      await expect(promise).rejects.toThrow();
    });

    it('should throw if createUsersTokensRepositoryStub.create throws', async () => {
      const { sut, createUsersTokensRepositoryStub } = makeSut();
      jest.spyOn(createUsersTokensRepositoryStub, 'create').mockImplementation(() => {
        throw new Error();
      })

      const promise = sut.renew('any_refresh_token');

      await expect(promise).rejects.toThrow();
    });
  });
});