import { CreateStockRepositoryRequestDto, ICreateStockRepository } from "@/application/infra-protocols/db/stock/create-stock-repository";
import { IStock } from "@/domain/entities/stock";
import { DbCreateStock } from "./db-create-stock";

const makeFakeRequest = (): CreateStockRepositoryRequestDto => ({
  code: 'any-code',
  high: 100,
  low: 80,
  open: 85,
  close: 90,
  volume: 10
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
    async create(request: CreateStockRepositoryRequestDto): Promise<IStock> {
      return new Promise(resolve => resolve(makeFakeStock()))
    }
  }
  return new CreateStockRepositoryStub();
}

type makeSutTypes = {
  sut: DbCreateStock;
  createStockRepositoryStub: ICreateStockRepository;
}
const makeSut = (): makeSutTypes => {
  const createStockRepositoryStub = makeCreateStockRepositoryStub();
  const sut = new DbCreateStock(createStockRepositoryStub);

  return {
    sut,
    createStockRepositoryStub
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

  describe('Behavior', () => {
    it('should return IStock when succeds', async () => {
      const { sut } = makeSut();
      
      const respose = await sut.create(makeFakeRequest());

      expect(respose).toEqual(makeFakeStock());
    });
  });

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