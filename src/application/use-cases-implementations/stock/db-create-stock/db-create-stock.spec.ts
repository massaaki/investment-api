import { WebGetStockInformationsRequestDTO } from "@/application/dtos/web-get-stock-informations-dto/web-get-stock-informations-request-dto";
import { WebGetStockInformationsResponseDTO } from "@/application/dtos/web-get-stock-informations-dto/web-get-stock-informations-response-dto";
import { CreateStockRepositoryRequestDto, ICreateStockRepository } from "@/application/infra-protocols/db/stock/create-stock-repository";
import { IWebRequestStockInformations } from "@/application/infra-protocols/web-request/web-request-stock-informations";
import { IStock } from "@/domain/entities/stock";
import { DbCreateStock } from "./db-create-stock";

const makeFakeRequest = (): CreateStockRepositoryRequestDto => ({
  code: 'any-code',
  history: [{
    high: 100,
    low: 80,
    open: 85,
    close: 90,
    volume: 10
}]

});

const makeFakeStock = (): IStock => ({
  id: 'any-id',
  code: 'any-code',
  high: 100,
  low: 80,
  open: 85,
  close: 90,
  volume: 10
})

const makeCreateStockRepositoryStub = (): ICreateStockRepository => {
  class CreateStockRepositoryStub implements ICreateStockRepository {
    async create(request: CreateStockRepositoryRequestDto): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new CreateStockRepositoryStub();
}

const makeFakeStockWebInformations = (): WebGetStockInformationsResponseDTO => ({
  code: 'any-code',
  history: [{
    high: 100,
    low: 80,
    open: 85,
    close: 90,
    volume: 10
}]
})

const makeWebRequestStockInformations = (): IWebRequestStockInformations => {
  class WebRequestStockInformationsStub implements IWebRequestStockInformations {
    getStocksInformations(request: WebGetStockInformationsRequestDTO): Promise<WebGetStockInformationsResponseDTO> {
      return new Promise(resolve => resolve(makeFakeStockWebInformations()))
    }
  }
  return new WebRequestStockInformationsStub();

}

type makeSutTypes = {
  sut: DbCreateStock;
  createStockRepositoryStub: ICreateStockRepository;
  webRequestStockInformationStub: IWebRequestStockInformations;
}
const makeSut = (): makeSutTypes => {
  const createStockRepositoryStub = makeCreateStockRepositoryStub();
  const webRequestStockInformationStub = makeWebRequestStockInformations();
  const sut = new DbCreateStock(createStockRepositoryStub, webRequestStockInformationStub);

  return {
    sut,
    createStockRepositoryStub,
    webRequestStockInformationStub
  }
}

describe('## DbCreateStock UseCase', () => {
  describe('Verify', () => {
    it('should call CreateStockRepositoryStub.create with correct values', async () => {
      const { sut, createStockRepositoryStub } = makeSut();
      const createSpy = jest.spyOn(createStockRepositoryStub, 'create');

      await sut.create(makeFakeRequest());
       expect(createSpy).toHaveBeenCalledWith(makeFakeRequest())
    });
  });

  // describe('Behavior', () => {

  // });

  describe('Throw', () => {  
    it('should throw if CreateStockRepository.create throws', async () => {
      const { sut, createStockRepositoryStub } = makeSut();


      jest.spyOn(createStockRepositoryStub, 'create').mockImplementationOnce(() => {
        throw new Error();
      });

      const promise = sut.create(makeFakeRequest());

      await expect(promise).rejects.toThrow();
    })
  });
});