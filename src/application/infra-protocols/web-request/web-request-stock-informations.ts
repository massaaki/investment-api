import { WebGetStockInformationsRequestDTO } from "@/application/dtos/web-get-stock-informations-dto/web-get-stock-informations-request-dto";
import { WebGetStockInformationsResponseDTO } from "@/application/dtos/web-get-stock-informations-dto/web-get-stock-informations-response-dto";

export interface IWebRequestStockInformations {
  getStocksInformations(request: WebGetStockInformationsRequestDTO): Promise<WebGetStockInformationsResponseDTO>;
}