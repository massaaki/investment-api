import { CreateUsersTokensRequestDto } from "@/application/dtos/create-users-tokens-dto/create-users-tokens-request-dto";
import { CreateUsersTokensResponseDto } from "@/application/dtos/create-users-tokens-dto/create-users-tokens-response-dto";
import { IHashComparer } from "@/application/infra-protocols/criptography/hash-comparer";
import { IToken } from "@/application/infra-protocols/criptography/token";
import { ICreateUsersTokensRepository } from "@/application/infra-protocols/db/create-users-tokens-repository";
import { IUser } from "@/domain/entities/user";
import { ILoadUserByEmail } from "@/domain/use-cases-protocols/user/load-user-by-email";
import { DbAuthenticate } from "./db-authenticate";


const makeFakeRequest = () => ({
  email: 'any-email@email.com',
  password: 'any-password'
})

const makeFakeUser = (): IUser => ({
  id: 'any-id',
  name: 'any-name',
  email: 'any-email@email.com',
  password: 'any_password'
})


const makeCreateUsersTokensRepository = () => {
  class CreateUsersTokensRepositoryStub implements ICreateUsersTokensRepository {
    create(data: CreateUsersTokensRequestDto): Promise<CreateUsersTokensResponseDto> {
      return new Promise(resolve => resolve());
    }
  }
  return new CreateUsersTokensRepositoryStub();
}

const makeToken = () => {
  class TokenStub implements IToken {
    async generate(userId: string, expiresInMinutes: number): Promise<string> {
      return new Promise(resolve => resolve('any-token'));
    }
  }
  return new TokenStub();
}

const makeHashComparer = () => {
  class HashComparerStub implements IHashComparer {
    async compare(value: string, hash: string): Promise<boolean> {
      return new Promise(resolve => resolve(true));
    }
  }
  return new HashComparerStub();
}


const makeLoadUserByEmailRepositoryStub = () => {
  class LoadUserByEmailRepositoryStub implements ILoadUserByEmail {
    async loadByEmail(email: string): Promise<IUser> {
      return new Promise(resolve => resolve(makeFakeUser()));
    }
  }
  return new LoadUserByEmailRepositoryStub();
}

type makeSutType = {
  sut: DbAuthenticate;
  loadUserByEmailRepositoryStub: ILoadUserByEmail;
  hashComparerStub: IHashComparer;
  tokenStub: IToken;
  createUsersTokensRepositoryStub: ICreateUsersTokensRepository;
}

const makeSut = (): makeSutType => {
  const loadUserByEmailRepositoryStub = makeLoadUserByEmailRepositoryStub();
  const hashComparerStub = makeHashComparer();
  const tokenStub = makeToken();
  const createUsersTokensRepositoryStub = makeCreateUsersTokensRepository();

  const sut = new DbAuthenticate(
    loadUserByEmailRepositoryStub,
    hashComparerStub,
    tokenStub,
    createUsersTokensRepositoryStub
  );

  return {
    sut,
    loadUserByEmailRepositoryStub,
    hashComparerStub,
    tokenStub,
    createUsersTokensRepositoryStub
  };
}

describe('## DbAuthenticate UseCase', () => {
  describe("Verify", () => {
    it('should call Auth with correct values', async () => {
      const { sut } = makeSut();
      const authSpy = jest.spyOn(sut, 'auth');

      await sut.auth(makeFakeRequest());
      expect(authSpy).toHaveBeenCalledWith(makeFakeRequest());
    });

    it('should call LoadUserByEmailRepository.loadByEmailSpy with correct values', () => {
      const { sut, loadUserByEmailRepositoryStub } = makeSut();

      const loadByEmailSpy = jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail');

      const request = makeFakeRequest();
      sut.auth(request);

      expect(loadByEmailSpy).toHaveBeenCalledWith(request.email);
    });

    it('should call HashComparer.compare with correct values', async () => {
      const { sut, hashComparerStub } = makeSut();
      const compareSpy = jest.spyOn(hashComparerStub, 'compare');

      await sut.auth(makeFakeRequest());

      const { password } = makeFakeRequest();
      const { password: hashedPassword } = makeFakeUser();

      expect(compareSpy).toHaveBeenCalledWith(password, hashedPassword)
    });

    it('should call CreateUsersTokensRepository.create with correct values', async () => {
      const { sut, createUsersTokensRepositoryStub } = makeSut();
      const createSpy = jest.spyOn(createUsersTokensRepositoryStub, 'create');

      await sut.auth(makeFakeRequest());

      expect(createSpy).toHaveBeenCalled();
    });
  });

  describe('Authenticate', () => {
    it('should return NULL if email is not found', async () => {
      const { sut, loadUserByEmailRepositoryStub } = makeSut();

      jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise(resolve => resolve(null)));

      const response = await sut.auth(makeFakeRequest());

      expect(response).toBeNull();
    });

    it('should call Token.generate with 2 times(token and refreshToken)', async () => {
      const { sut, tokenStub } = makeSut();
      const generateSpy = jest.spyOn(tokenStub, 'generate');

      await sut.auth(makeFakeRequest());

      expect(generateSpy).toHaveBeenCalledTimes(2);
    });

    it('should return id, token and refreshTokenn if Auth succeeds', async () => {
      const { sut } = makeSut();
      const response = await sut.auth(makeFakeRequest());

      expect(response).toEqual({
        id: 'any-id',
        token: 'any-token',
        refreshToken: 'any-token'
      });
    });

  });

  describe('Throws', () => {
    it('should throw if LoadUserByEmailRepository.loadByEmailSpy throws', async () => {
      const { sut, loadUserByEmailRepositoryStub } = makeSut();

      jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockImplementation(() => {
        throw new Error();
      });

      const request = makeFakeRequest();
      const promise = sut.auth(request);

      await expect(promise).rejects.toThrow();
    });

    it('should throw if Token.generate throws', async () => {
      const { sut, tokenStub } = makeSut();
      jest.spyOn(tokenStub, 'generate').mockImplementation(() => {
        throw new Error();
      });

      const promise = sut.auth(makeFakeRequest());

      await expect(promise).rejects.toThrow();
    });

    it('should throw if HashComparer.compare throws', async () => {
      const { sut, hashComparerStub } = makeSut();

      jest.spyOn(hashComparerStub, 'compare').mockImplementation(() => {
        throw new Error();
      });

      const promise = sut.auth(makeFakeRequest());
      await expect(promise).rejects.toThrow();
    });


    it('should throw if CreateUsersTokensRepository.create throws', async () => {
      const { sut, createUsersTokensRepositoryStub } = makeSut();
      jest.spyOn(createUsersTokensRepositoryStub, 'create').mockImplementation(() => {
        throw new Error();
      });

      const promise = sut.auth(makeFakeRequest());
      await expect(promise).rejects.toThrow();
    })
  });
});