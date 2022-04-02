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
    create(request: CreateStockRepositoryRequestDto): Promise<IStock> {
      
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

    it('should call CreateStockRepositoryStub.create with correct valyes', async () => {
      const { sut, createStockRepositoryStub } = makeSut();
      const createSpy = jest.spyOn(createStockRepositoryStub, 'create');

      await sut.create(makeFakeRequest());
      expect(createSpy).toHaveBeenCalledWith(makeFakeRequest())

    });
  });
  // describe('Behavior', () => {});
  // describe('Throw', () => {});
});