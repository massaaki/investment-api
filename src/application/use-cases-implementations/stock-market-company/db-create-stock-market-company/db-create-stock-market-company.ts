import { IStockMarketCompany } from "@/domain/entities/stock-market-company";
import { CreateStockMarketCompanyRequest, ICreateStockMarketCompany } from "@/domain/use-cases-protocols/stock-market-company/create-stock-market-company";

import { ICreateStockMarketCompanyRepository } from "@/application/infra-protocols/db/stock-market-company-repositories/create-stock-market-company-repository";
import { ILoadStockMarketCompanyByCodeRepository } from "@/application/infra-protocols/db/stock-market-company-repositories/load-stock-market-company-by-code-repository";

export class DbCreateStockMarketCompany implements ICreateStockMarketCompany {

  constructor(
    private readonly creeateStockMarketCompanyRepository: ICreateStockMarketCompanyRepository,
    private readonly loadStockMarketCompanyByCodeRepository: ILoadStockMarketCompanyByCodeRepository
  ) {}


  async create({ code, name }: CreateStockMarketCompanyRequest): Promise<IStockMarketCompany> {

    const stockMarketCompanyAlreadyExists = await this.loadStockMarketCompanyByCodeRepository.loadByCode(code);

    if (stockMarketCompanyAlreadyExists) {
      return null;
    }

    const stockMarketCompany = await this.creeateStockMarketCompanyRepository.create({ code, name });



    return null;
  }

}