import { IStockMarketCompany } from "@/domain/entities/stock-market-company";
import { CreateStockMarketCompanyRequest } from "@/domain/use-cases-protocols/stock-market-company/create-stock-market-company";

import { ICreateStockMarketCompanyRepositoryRequestDto } from "@/application/dtos/stock-market-company-dto/create-stock-market-company-repository-request-dto copy";
import { ICreateStockMarketCompanyRepository } from "@/application/infra-protocols/db/stock-market-company-repositories/create-stock-market-company-repository";

import { DbCreateStockMarketCompany } from "./db-create-stock-market-company";


const makeFakeRequest = (): CreateStockMarketCompanyRequest => ({
  code: 'any-code',
  name: 'any-name'
})

const makeFakeStockMarketCompany = (): IStockMarketCompany => ({
  id: 'any-id',
  code: 'any-code',
  name: 'any-name'
})


const makeCreateStockMarketCompanyRepositoryStub = (): ICreateStockMarketCompanyRepository => {
  class CreateStockMarketCompanyRepositoryStub implements ICreateStockMarketCompanyRepository {
    async create(request: ICreateStockMarketCompanyRepositoryRequestDto): Promise<IStockMarketCompany> {
      return new Promise(resolve => resolve(makeFakeStockMarketCompany()))
    }
  }
  return new CreateStockMarketCompanyRepositoryStub();
}


type makeSutType = {
  sut: DbCreateStockMarketCompany
  createStockMarketCompanyRepositoryStub: ICreateStockMarketCompanyRepository
}
const makeSut = (): makeSutType => {

  const createStockMarketCompanyRepositoryStub = makeCreateStockMarketCompanyRepositoryStub()
  const sut = new DbCreateStockMarketCompany(createStockMarketCompanyRepositoryStub);

  return {
    sut,
    createStockMarketCompanyRepositoryStub
  }
}

describe("## DbCreateStockMarketCompany UseCase", () => {
  describe("Verify", () => {
    it("should calls createStockMarketRepository.create with correct values", async () => {
      const { sut, createStockMarketCompanyRepositoryStub } = makeSut();
      const createSpy = jest.spyOn(createStockMarketCompanyRepositoryStub, 'create');

      await sut.create(makeFakeRequest())

      expect(createSpy).toHaveBeenCalledWith({
        code: 'any-code',
        name: 'any-name'
      });
    });
  })

  // describe("Behavior", () => {})

  // describe("Throws", () => {})
});