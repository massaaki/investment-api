import { GetStockMarketIndexVariationRepositoryResponseDto, IGetStockMarketIndexVariationRepository } from '@/application/infra-protocols/db/stock-market-index-daily-variations-repositories/get-list-stock-market-index-variation-repository'
import { IStockMarketIndexDailyVariation } from '@/domain/entities/stock-market-index'
import {DbListStockMarketIndexVariation} from './db-list-stock-market-index-variation'

const makeFakeMarketIndexVariation = (): IStockMarketIndexDailyVariation => ({
  id: 'any-id',
  date: new Date(),
  isOpened: true,
  max: 100,
  min: 80,
  value: 90,
  volume: 10000
})

const makeGetListStockMarketIndexVariationRepositoryStub = (): IGetStockMarketIndexVariationRepository => {
  class GetStockMarketMarketIndexVariationStub implements IGetStockMarketIndexVariationRepository {
    getByCode(code: string): Promise<GetStockMarketIndexVariationRepositoryResponseDto> {
      return new Promise(resolve => resolve([makeFakeMarketIndexVariation()]))
    }
  }
  return new GetStockMarketMarketIndexVariationStub();
}

type makeSutType = {
  sut: DbListStockMarketIndexVariation,
  getStockMarketIndexVariationStub: IGetStockMarketIndexVariationRepository
}

const makeSut = (): makeSutType => {
  const getStockMarketIndexVariationStub = makeGetListStockMarketIndexVariationRepositoryStub();

  const sut = new DbListStockMarketIndexVariation(getStockMarketIndexVariationStub);

  return {
    sut,
    getStockMarketIndexVariationStub
  }
}


describe('## DbListStockMarketIndexVariation UseCase', () => {
  describe('Verify', () => {
    it('should call getListStockMarketIndexVariationRepository.getByCode with correct value', async () => {
      const { sut, getStockMarketIndexVariationStub } = makeSut();
      
      const getByCodeSpy = jest.spyOn(getStockMarketIndexVariationStub, 'getByCode');

      await sut.getByCode('any-code');

      expect(getByCodeSpy).toHaveBeenCalledWith('any-code');
    });
  });

  describe('Behaviour', () => {
    it('should return a list of stock when success', async () => {
      const { sut } = makeSut();
      
      const response = await sut.getByCode('any-code');

      expect(response).toEqual([makeFakeMarketIndexVariation()]);
    });
  });

  describe('Throw', () => {
    it('should throw if getListStockMarketIndexVariationRepository.getByCode throws', async () => {
      const { sut, getStockMarketIndexVariationStub } = makeSut();

      jest.spyOn(getStockMarketIndexVariationStub, 'getByCode').mockImplementationOnce(() => {
        throw new Error();
      });
      const promise = sut.getByCode('any-code');
      await expect(promise).rejects.toThrow();
    })

  })
})