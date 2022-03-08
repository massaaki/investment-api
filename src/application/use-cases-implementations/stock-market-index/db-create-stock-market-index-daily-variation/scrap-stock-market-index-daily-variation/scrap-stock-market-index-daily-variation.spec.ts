import { CrawlerFindStockIndexValueRequestDto } from "@/application/dtos/crawler-find-stock-index-value-dto/crawler-find-stock-index-value-request-dto"
import { CrawlerFindStockIndexValueResponseDto } from "@/application/dtos/crawler-find-stock-index-value-dto/crawler-find-stock-index-value-response-dto"
import { ICrawlerFindStockIndexValue } from "@/application/infra-protocols/web-crawler/crawler-find-stock-index-value"
import { ScrapStockMarketIndexDailyVariationRequest } from "@/domain/use-cases-protocols/stock-market-index/scrap-stock-market-index-daily-variation"
import { ScrapStockMarketIndexDailyVariation } from "./scrap-stock-market-index-daily-variation"

const makeFakeRequest = (): ScrapStockMarketIndexDailyVariationRequest => ({
  code: 'IBOV',
  siteUrl: 'https://any-site.com'
})

const makeFakerawlerFindStockIndexValue = (): CrawlerFindStockIndexValueResponseDto => ({
  value: 50.30
});


const makeCrawlerFindStockIndexValue = () => {
  class CrawlerFindStockIndexValueStub implements ICrawlerFindStockIndexValue {
    async scrap(request: CrawlerFindStockIndexValueRequestDto): Promise<CrawlerFindStockIndexValueResponseDto> {
      return new Promise(resolve => resolve(makeFakerawlerFindStockIndexValue()))
    }
  }

  return new CrawlerFindStockIndexValueStub();
}


type makeSutType = {
  sut: ScrapStockMarketIndexDailyVariation,
  crawlerFindStockIndexValueStub: ICrawlerFindStockIndexValue
}
const makeSut = (): makeSutType => {
  const crawlerFindStockIndexValueStub = makeCrawlerFindStockIndexValue();

  const sut = new ScrapStockMarketIndexDailyVariation(crawlerFindStockIndexValueStub);

  return {
    sut,
    crawlerFindStockIndexValueStub
  }
}


describe("## ScrapStockMarketIndex UseCase", () => {
  describe("Verify", () => {
    it("should call crawlerFindStockIndexValue.scrap with correct values", async () => {
      const { sut, crawlerFindStockIndexValueStub } = makeSut();

      const scrapSpy = jest.spyOn(crawlerFindStockIndexValueStub, 'scrap');

      await sut.scrap(makeFakeRequest());

      expect(scrapSpy).toHaveBeenCalledWith({ code: 'IBOV', siteUrl: 'https://any-site.com' });
    });
  });

  describe('Behavior', () => {
    it("should return null if crawlerFindStockIndexValue.scrap returns null", async () => {
      const { sut, crawlerFindStockIndexValueStub } = makeSut();

      jest.spyOn(crawlerFindStockIndexValueStub, 'scrap').mockReturnValueOnce(new Promise(resolve => resolve(null)));

      const response = await sut.scrap(makeFakeRequest());
      expect(response).toBeNull();
    });

    it("should return a value when succeeds", async () => {
      const { sut } = makeSut();

      const response = await sut.scrap(makeFakeRequest());
      expect(response).toEqual({
        value: 50.30
      })
    })
  });


  describe("Throws", () => {
    it("should throw if crawlerFindStockIndexValue.scrap throws", async () => {
      const { sut, crawlerFindStockIndexValueStub } = makeSut();

      jest.spyOn(crawlerFindStockIndexValueStub, 'scrap').mockImplementation(() => {
        throw new Error()
      })

      const promise = sut.scrap(makeFakeRequest());

      await expect(promise).rejects.toThrow();
    })
  })

}) 