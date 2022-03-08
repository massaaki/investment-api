import { WebGetStockInformationsRequestDTO } from "@/application/dtos/web-get-stock-informations-dto/web-get-stock-informations-request-dto";
import { WebGetStockInformationsResponseDTO } from "@/application/dtos/web-get-stock-informations-dto/web-get-stock-informations-response-dto";
import { IWebRequestStockInformations } from "@/application/infra-protocols/web-request/web-request-stock-informations";
import { GetStockMarketInformationsRequest } from "@/domain/use-cases-protocols/stock-market-index.ts/get-stock-market-index";
import { GetStockMarketInformations } from "./get-stock-market-informations";



const makeFakeRequest = (): GetStockMarketInformationsRequest => ({
  code: 'IBOV'
})

const makeFakeStockWebInformations = (): WebGetStockInformationsResponseDTO => ({
  code: 'IBOV',
  history: [{ open: 10, close: 12, low: 9, high: 14, volume: 30000 }]
})

const makeWebRequestStockInformations = (): IWebRequestStockInformations => {
  class WebRequestStockInformationsStub implements IWebRequestStockInformations {
    getStocksInformations(request: WebGetStockInformationsRequestDTO): Promise<WebGetStockInformationsResponseDTO> {
      return new Promise(resolve => resolve(makeFakeStockWebInformations()))
    }
  }
  return new WebRequestStockInformationsStub();

}


type makeSutType = {
  sut: GetStockMarketInformations,
  webRequestStockInFormationsStub: IWebRequestStockInformations
}

const makeSut = (): makeSutType => {
  const webRequestStockInFormationsStub = makeWebRequestStockInformations();

  const sut = new GetStockMarketInformations(webRequestStockInFormationsStub);

  return {
    sut,
    webRequestStockInFormationsStub
  }


}

describe('## GetStockMarketIndex UseCase', () => {
  describe("Verify", () => {
    it('should call GetStockMarketInformationsRequest.getStocksInformations with correct values', async () => {
      const { sut, webRequestStockInFormationsStub } = makeSut();

      const getStocksInformationsSpy = jest.spyOn(webRequestStockInFormationsStub, 'getStocksInformations');

      await sut.getStocksInformations(makeFakeRequest());

      expect(getStocksInformationsSpy).toHaveBeenCalledWith({ code: 'IBOV' });


    })
  });

  describe("Behavior", () => {
    it('should return informations when succeeds', async () => {
      const { sut } = makeSut();

      const response = await sut.getStocksInformations(makeFakeRequest());

      expect(response).toEqual({
        code: 'IBOV',
        history: [{ value: 12, min: 9, max: 14, volume: 30000 }]
      })
    })
  });

  describe("Throw", () => {
    it('should throw if GetStockMarketInformationsRequest.getStocksInformations throws', async () => {
      const { sut, webRequestStockInFormationsStub } = makeSut();

      jest.spyOn(webRequestStockInFormationsStub, 'getStocksInformations').mockImplementationOnce(() => {
        throw new Error();
      });

      const response = sut.getStocksInformations(makeFakeRequest());
      await expect(response).rejects.toThrow();
    })
  });
});