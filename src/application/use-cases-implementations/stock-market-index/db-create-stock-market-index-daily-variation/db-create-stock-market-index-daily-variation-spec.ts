// import { IStockMarketIndex } from "@/domain/entities/stock-market-index";
// import { CreateStockMarketIndexDailyVariationRequestProps } from "@/domain/use-cases-protocols/stock-market-index/create-stock-market-index-daily-variation";

// import { StockMarketIndexDailyVariationRequestDto } from "@/application/dtos/stock-market-index-daily-variation-dto/stock-market-index-daily-variation-request-dto";
// import { StockMarketIndexDailyVariationResponseDto } from "@/application/dtos/stock-market-index-daily-variation-dto/stock-market-index-daily-variation-response-dto";
// import { ICreateStockMarketIndexDailyVariationRepository } from "@/application/infra-protocols/db/stock-market-index-daily-variations-repositories/create-stock-market-index-daily-variation-repository";
// import { ILoadStockMarketIndexVariationDailyByCodeRepository } from "@/application/infra-protocols/db/stock-market-index-daily-variations-repositories/load-stock-market-index-variation-daily-by-code-repository";
// import { ILoadStockMarketIndexByCodeRepository } from "@/application/infra-protocols/db/stock-market-index-repositories/load-stock-market-index-by-code-repository";

// import { DbCreateStockMarketIndexDailyVariation } from "./db-create-stock-market-index-daily-variation";
// import { IUpdateStockMarketIndexDailyVariationRepository } from "@/application/infra-protocols/db/stock-market-index-daily-variations-repositories/update-stock-market-index-daily-variation-repository";
// import { ICrawlerFindStockIndexValue } from "@/application/infra-protocols/web-crawler/crawler-find-stock-index-value";
// import { CrawlerFindStockIndexValueRequestDto } from "@/application/dtos/crawler-find-stock-index-value-dto/crawler-find-stock-index-value-request-dto";
// import { CrawlerFindStockIndexValueResponseDto } from "@/application/dtos/crawler-find-stock-index-value-dto/crawler-find-stock-index-value-response-dto";


// jest.mock('@/application/application-helpers/stock-market-time', () => ({
//   isOpened: () => {
//     return true;
//   }
// }))


// jest.mock('@/application/application-helpers/stock-market-time', () => ({
//   isOpened: () => {
//     return true;
//   }
// }))


// const makeFakeRequest = (): CreateStockMarketIndexDailyVariationRequestProps => ({
//   code: 'any-code',
//   value: 89.00
// })


// const makeFakeCrawlerFindStockIndexRequest = (): CrawlerFindStockIndexValueRequestDto => ({
//   code: 'any-code',
//   siteUrl: 'https://finance.yahoo.com/quote/%5EBVSP'
// })

// const makeFakeStockMarketIndex = (): IStockMarketIndex => ({
//   id: 'any-id',
//   code: 'any-code',
//   opensAt: '8:00',
//   closesAt: '20:00'
// })

// const makeFakeStockMarketIndexDailyVariation = (): StockMarketIndexDailyVariationResponseDto => ({
//   id: 'any-id',
//   value: 89.12,
//   isOpened: true,
//   max: 99.00,
//   min: 74.30
// })


// const makeCrawlerFindStockIndexValueStub = (): ICrawlerFindStockIndexValue => {
//   class CrawlerFindStockIndexValueStub implements ICrawlerFindStockIndexValue {
//     async scrap(request: CrawlerFindStockIndexValueRequestDto): Promise<CrawlerFindStockIndexValueResponseDto> {
//       return new Promise(resolve => resolve({ value: 89.0 }))
//     }
//   }
//   return new CrawlerFindStockIndexValueStub();
// }

// const makeLoadStockMarketIndexByCodeRepositoryStub = () => {
//   class LoadStockMarketIndexByCodeRepositoryStub implements ILoadStockMarketIndexByCodeRepository {
//     async loadByCode(code: string): Promise<IStockMarketIndex> {
//       return new Promise(resolve => resolve(makeFakeStockMarketIndex()))
//     }
//   }
//   return new LoadStockMarketIndexByCodeRepositoryStub()
// }

// const makeLoadStockMarketIndexDailyByCodeRepositoryStub = () => {
//   class LoadStockMarketIndexDailyByCodeRepositoryStub implements ILoadStockMarketIndexVariationDailyByCodeRepository {
//     async loadByCode(code: string): Promise<StockMarketIndexDailyVariationResponseDto> {
//       return new Promise(resolve => resolve(null));
//     }
//   }
//   return new LoadStockMarketIndexDailyByCodeRepositoryStub();
// }

// const makeCreateStockMarketIndexDailyVariationRepositoryStub = () => {
//   class CreateStockMarketIndexDailyVariationRepositoryStub implements ICreateStockMarketIndexDailyVariationRepository {
//     async create(request: StockMarketIndexDailyVariationRequestDto): Promise<StockMarketIndexDailyVariationResponseDto> {
//       return new Promise(resolve => resolve(makeFakeStockMarketIndexDailyVariation()))
//     }
//   }

//   return new CreateStockMarketIndexDailyVariationRepositoryStub();
// }
// const makeUpdateStockMarketIndexDailyVariationRepositoryStub = () => {
//   class UpdateStockMarketIndexDailyVariationRepositoryStub implements IUpdateStockMarketIndexDailyVariationRepository {
//     async update(request: StockMarketIndexDailyVariationRequestDto): Promise<StockMarketIndexDailyVariationResponseDto> {
//       return new Promise(resolve => resolve({ ...makeFakeStockMarketIndexDailyVariation(), value: 93.00 }));
//     }
//   }

//   return new UpdateStockMarketIndexDailyVariationRepositoryStub();
// }


// type makeSutType = {
//   sut: DbCreateStockMarketIndexDailyVariation
//   loadStockMarketIndexByCodeRepositoryStub: ILoadStockMarketIndexByCodeRepository
//   loadStockMarketIndexDailyByCodeRepositoryStub: ILoadStockMarketIndexVariationDailyByCodeRepository
//   createStockMarketIndexDailyVariationRepositoryStub: ICreateStockMarketIndexDailyVariationRepository
//   updateStockMarketIndexDailyVariationRepositoryStub: IUpdateStockMarketIndexDailyVariationRepository
//   crawlerFindStockIndexValueStub: ICrawlerFindStockIndexValue
// }
// const makeSut = (): makeSutType => {
//   const loadStockMarketIndexByCodeRepositoryStub = makeLoadStockMarketIndexByCodeRepositoryStub()
//   const loadStockMarketIndexDailyByCodeRepositoryStub = makeLoadStockMarketIndexDailyByCodeRepositoryStub();
//   const createStockMarketIndexDailyVariationRepositoryStub = makeCreateStockMarketIndexDailyVariationRepositoryStub();
//   const updateStockMarketIndexDailyVariationRepositoryStub = makeUpdateStockMarketIndexDailyVariationRepositoryStub();
//   const crawlerFindStockIndexValueStub = makeCrawlerFindStockIndexValueStub();

//   const sut = new DbCreateStockMarketIndexDailyVariation(
//     loadStockMarketIndexByCodeRepositoryStub,
//     loadStockMarketIndexDailyByCodeRepositoryStub,
//     createStockMarketIndexDailyVariationRepositoryStub,
//     updateStockMarketIndexDailyVariationRepositoryStub,
//     crawlerFindStockIndexValueStub
//   );

//   return {
//     sut,
//     loadStockMarketIndexByCodeRepositoryStub,
//     loadStockMarketIndexDailyByCodeRepositoryStub,
//     createStockMarketIndexDailyVariationRepositoryStub,
//     updateStockMarketIndexDailyVariationRepositoryStub,
//     crawlerFindStockIndexValueStub
//   }
// }


// describe("## DbCreateStockMarketDailyIndex UseCase", () => {
//   describe("Verify", () => {
//     it("should calls loadStockMarketIndexByCodeRepository.loadByCode with correct values", async () => {
//       const { sut, loadStockMarketIndexByCodeRepositoryStub } = makeSut();

//       const loadByCodeSpy = jest.spyOn(loadStockMarketIndexByCodeRepositoryStub, 'loadByCode');

//       await sut.create(makeFakeRequest());
//       expect(loadByCodeSpy).toHaveBeenCalledWith('any-code');
//     })
//   });

//   describe("Behavior", () => {
//     it("should return null if code in stockMarketIndex does not exists", async () => {
//       const { sut, loadStockMarketIndexByCodeRepositoryStub } = makeSut();

//       jest.spyOn(loadStockMarketIndexByCodeRepositoryStub, 'loadByCode').mockReturnValueOnce(new Promise(resolve => resolve(null)));

//       const response = await sut.create(makeFakeRequest());
//       expect(response).toBeNull();
//     });

//     it("should return a stockMarketIndexDailyVariation if succeeds", async () => {
//       const { sut } = makeSut();

//       const response = await sut.create(makeFakeRequest());
//       expect(response).toEqual(makeFakeStockMarketIndexDailyVariation());
//     })
//   });

//   describe("Throws", () => {
//     it("should throw if loadStockMarketIndexByCodeRepository.loadByCode throws", async () => {
//       const { sut, loadStockMarketIndexByCodeRepositoryStub } = makeSut();

//       jest.spyOn(loadStockMarketIndexByCodeRepositoryStub, 'loadByCode').mockImplementation(() => {
//         throw new Error();
//       });

//       const promise = sut.create(makeFakeRequest());
//       await expect(promise).rejects.toThrow();
//     });

//     it("should throw if loadStockMarketIndexDailyByCodeRepositoryStub.loadByCode throws", async () => {
//       const { sut, loadStockMarketIndexDailyByCodeRepositoryStub } = makeSut();

//       jest.spyOn(loadStockMarketIndexDailyByCodeRepositoryStub, 'loadByCode').mockImplementation(() => {
//         throw new Error();
//       });

//       const promise = sut.create(makeFakeRequest());
//       await expect(promise).rejects.toThrow();
//     });

//     it("should throw if createStockMarketIndexDailyVariationRepositoryStub.create throws", async () => {
//       const { sut, createStockMarketIndexDailyVariationRepositoryStub } = makeSut();

//       jest.spyOn(createStockMarketIndexDailyVariationRepositoryStub, 'create').mockImplementation(() => {
//         throw new Error();
//       });

//       const promise = sut.create(makeFakeRequest());
//       await expect(promise).rejects.toThrow();
//     });

//     it("should throw if updateStockMarketIndexDailyVariationRepositoryStub.update throws", async () => {
//       const { sut, updateStockMarketIndexDailyVariationRepositoryStub, loadStockMarketIndexDailyByCodeRepositoryStub } = makeSut();
//       jest.spyOn(loadStockMarketIndexDailyByCodeRepositoryStub, 'loadByCode').mockReturnValueOnce(new Promise(resolve => resolve(makeFakeStockMarketIndexDailyVariation())));

//       jest.spyOn(updateStockMarketIndexDailyVariationRepositoryStub, 'update').mockImplementation(() => {
//         throw new Error();
//       });

//       const promise = sut.create(makeFakeRequest());
//       await expect(promise).rejects.toThrow();
//     });

//   });
// });