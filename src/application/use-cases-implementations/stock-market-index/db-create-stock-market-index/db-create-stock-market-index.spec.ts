import { CreateStockMarketRequestProps } from "@/domain/use-cases-protocols/stock-market-index.ts/create-stock-market-index"

import { DbCreateStockMarketIndex } from "./db-create-stock-market-index"
import { ICreateMarketIndexRepository } from '@/application/infra-protocols/db/stock-market-index-repositories/create-stock-market-index-repository'
import { IStockMarketIndex } from "@/domain/entities/stock-market-index"
import { ILoadStockMarketIndexByCodeRepository } from "@/application/infra-protocols/db/stock-market-index-repositories/load-stock-market-index-by-code-repository"


const makeFakeRequest = (): CreateStockMarketRequestProps => ({
  code: 'IBOV',
  opensAt: '8:00',
  closesAt: '20:00'
})


const makeFakeStockMarketIndex = (): IStockMarketIndex => ({
  id: 'any_id',
  code: 'IBOV',
  opensAt: '8:00',
  closesAt: '20:00'
});


const makeLoadStockMarketIndexByCodeRepositoryStub = () => {
  class LoadStockMarketIndexByCodeRepositoryStub implements ILoadStockMarketIndexByCodeRepository {
    async loadByCode(code: string): Promise<IStockMarketIndex> {
      return new Promise(resolve => resolve(null))
    }
  }
  return new LoadStockMarketIndexByCodeRepositoryStub();
}

const makeCreateStockMarketIndexRepositoryStub = () => {
  class CreateStockMarketIndexRepositoryStub implements ICreateMarketIndexRepository {
    create(request: CreateStockMarketRequestProps): Promise<IStockMarketIndex> {
      return new Promise(resolve => resolve(makeFakeStockMarketIndex()));
    }
  }
  return new CreateStockMarketIndexRepositoryStub();
}


type makeSutType = {
  sut: DbCreateStockMarketIndex;
  createStockMarketIndexRepositoryStub: ICreateMarketIndexRepository;
  loadStockMarketIndexByCodeRepositoryStub: ILoadStockMarketIndexByCodeRepository;
}
const makeSut = (): makeSutType => {
  const loadStockMarketIndexByCodeRepositoryStub = makeLoadStockMarketIndexByCodeRepositoryStub();
  const createStockMarketIndexRepositoryStub = makeCreateStockMarketIndexRepositoryStub();

  const sut = new DbCreateStockMarketIndex(
    loadStockMarketIndexByCodeRepositoryStub,
    createStockMarketIndexRepositoryStub);

  return {
    sut,
    createStockMarketIndexRepositoryStub,
    loadStockMarketIndexByCodeRepositoryStub
  }
}


describe("## DbCreateStockMarketIndex UseCase", () => {
  describe("Verify", () => {
    it("should call CreateStockMarketIndexRepository.create with correct values", async () => {
      const { sut, createStockMarketIndexRepositoryStub } = makeSut();
      const createSpy = jest.spyOn(createStockMarketIndexRepositoryStub, 'create');

      await sut.create(makeFakeRequest());
      expect(createSpy).toHaveBeenCalledWith(makeFakeRequest());
    })

    it("should call LoadStockMarketIndexByCodeRepository.loadByCode with correct values", async () => {
      const { sut, loadStockMarketIndexByCodeRepositoryStub } = makeSut();
      const loadByCodeSpy = jest.spyOn(loadStockMarketIndexByCodeRepositoryStub, 'loadByCode');

      const request = makeFakeRequest();

      await sut.create(request);
      expect(loadByCodeSpy).toHaveBeenCalledWith(request.code);
    })
  });

  describe("Create Stock Market", () => {
    it("should returns null if code already exists", async () => {
      const { sut, loadStockMarketIndexByCodeRepositoryStub } = makeSut();

      jest.spyOn(loadStockMarketIndexByCodeRepositoryStub, 'loadByCode').mockReturnValueOnce(new Promise(resolve => resolve(makeFakeStockMarketIndex())))

      const response = await sut.create(makeFakeRequest());
      expect(response).toBeNull()
    });

    it("should return a StockMarketIndex if CreateStockMarketIndex.create succeeds", async () => {
      const { sut } = makeSut();

      const stockMarketIndex = await sut.create(makeFakeRequest());
      expect(stockMarketIndex).toEqual(makeFakeStockMarketIndex());
    });
  });

  describe("Throws", () => {
    it("should throw if CreateStockMarketIndexRepository.create throws", async () => {
      const { sut, createStockMarketIndexRepositoryStub } = makeSut();
      jest.spyOn(createStockMarketIndexRepositoryStub, 'create').mockImplementation(() => {
        throw new Error()
      });

      const promise = sut.create(makeFakeRequest())
      await expect(promise).rejects.toThrow()
    });

    it("should throw if LoadStockMarketIndexByCodeRepository.loadByCode throws", async () => {
      const { sut, loadStockMarketIndexByCodeRepositoryStub } = makeSut()

      jest.spyOn(loadStockMarketIndexByCodeRepositoryStub, 'loadByCode').mockImplementation(() => {
        throw new Error();
      });

      const promise = sut.create(makeFakeRequest());
      await expect(promise).rejects.toThrow();
    })

  });
});