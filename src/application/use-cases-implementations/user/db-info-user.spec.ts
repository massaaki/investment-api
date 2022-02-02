import { ILoadUserByIdRepository } from "@/application/infra-protocols/db/load-user-by-id-repository"
import { IUser } from "@/domain/entities/user"
import { DbInfoUser } from "./db-info-user"


const makeFakeUser = (): IUser => ({
  id: 'any-id',
  name: 'any-name',
  email: 'any-email',
  isAdmin: false,
  password: 'any-password'
})



const makeLoadUserByIdRepositorystub = (): ILoadUserByIdRepository => {
  class LoadUserByIdRepositoryStub implements ILoadUserByIdRepository {
    async loadById(id: string): Promise<IUser> {
      return new Promise(resolve => resolve(makeFakeUser()));
    }
  }
  return new LoadUserByIdRepositoryStub();
}




type makeSutType = {
  sut: DbInfoUser,
  loadUserByIdRepositoryStub: ILoadUserByIdRepository
}
const makeSut = (): makeSutType => {
  const loadUserByIdRepositoryStub = makeLoadUserByIdRepositorystub();
  const sut = new DbInfoUser(loadUserByIdRepositoryStub);

  return {
    sut,
    loadUserByIdRepositoryStub
  }
}

describe("## InfoUser UseCase", () => {
  describe("Verify", () => {
    it("should calls loadUserByIdRepository.loadById with correct values", async () => {
      const { sut, loadUserByIdRepositoryStub } = makeSut();

      const loadByIdSpy = jest.spyOn(loadUserByIdRepositoryStub, 'loadById');
      await sut.me('any-id');

      expect(loadByIdSpy).toHaveBeenCalledWith('any-id');
    });
  });

  describe('Behavior', () => {
    it('should return null if user does not exists', async () => {
      const { sut, loadUserByIdRepositoryStub } = makeSut();
      jest.spyOn(loadUserByIdRepositoryStub, 'loadById').mockReturnValueOnce(new Promise(resolve => resolve(null)));

      const response = await sut.me('any-id');

      expect(response).toBeNull();
    });

    it('should return a user if DbInfoUser.me succeeds', async () => {
      const { sut } = makeSut();

      const user = await sut.me('any-id');

      expect(user).toEqual(makeFakeUser());
    });
  });

  describe('Throws', () => {
    it('should throw if loadUserByIdRepository.loadById throws', async () => {
      const { sut, loadUserByIdRepositoryStub } = makeSut();
      jest.spyOn(loadUserByIdRepositoryStub, 'loadById').mockImplementation(() => {
        throw new Error();
      });

      const promise = sut.me('any-id');

      await expect(promise).rejects.toThrow();
    })
  })
})