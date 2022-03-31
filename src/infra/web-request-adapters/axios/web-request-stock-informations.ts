import axios from 'axios';
// import mockResult from './mock.json'
import { WebGetStockInformationsRequestDTO } from "@/application/dtos/web-get-stock-informations-dto/web-get-stock-informations-request-dto";
import { WebGetStockInformationsResponseDTO } from "@/application/dtos/web-get-stock-informations-dto/web-get-stock-informations-response-dto";
import { IWebRequestStockInformations } from "@/application/infra-protocols/web-request/web-request-stock-informations";

export class WebRequestStockInformations implements IWebRequestStockInformations {
  async getStocksInformations(request: WebGetStockInformationsRequestDTO): Promise<WebGetStockInformationsResponseDTO> {
    const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${request.code}&outputsize=full&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`);
    

    const history = Object.entries(response.data['Time Series (Daily)']).map(stock => {
      const date = new Date(stock[0]);

      return {
        close: Number(stock[1]['4. close']),
        high: Number(stock[1]['2. high']),
        low: Number(stock[1]['3. low']),
        open: Number(stock[1]['1. open']),
        volume: Number(stock[1]['5. volume']),
        date
      }
    })

    return {
      code: request.code,
      history
    }
  }

}