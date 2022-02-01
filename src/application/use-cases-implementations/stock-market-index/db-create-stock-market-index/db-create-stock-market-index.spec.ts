import { CreateStockMarketRequestProps } from "@/domain/use-cases-protocols/stock-market-index.ts/create-stock-market-index"

import { DbCreateStockMarketIndex } from "./db-create-stock-market-index"
import { ICreateMarketIndexRepository } from '@/application/infra-protocols/db/stock-market-index-repositories/create-stock-market-index-repository'
import { IStockMarketIndex } from "@/domain/entities/stock-market-index"


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
}
const makeSut = (): makeSutType => {
  const createStockMarketIndexRepositoryStub = makeCreateStockMarketIndexRepositoryStub();
  const sut = new DbCreateStockMarketIndex(createStockMarketIndexRepositoryStub);

  return {
    sut,
    createStockMarketIndexRepositoryStub
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
  });

  // describe("Create Stock Market", () => {})

  describe("Throws", () => {
    it("should throw if CreateStockMarketIndexRepository.create throws", async () => {
      const { sut, createStockMarketIndexRepositoryStub } = makeSut();
      jest.spyOn(createStockMarketIndexRepositoryStub, 'create').mockImplementation(() => {
        throw new Error()
      })

      const promise = sut.create(makeFakeRequest())
      await expect(promise).rejects.toThrow()
    })

  })
})