import { IStockMarketCompany } from "@/domain/entities/stock-market-company";
import { CreateStockMarketCompanyRequest, ICreateStockMarketCompany } from "@/domain/use-cases-protocols/stock-market-company/create-stock-market-company";

import { ICreateStockMarketCompanyRepository } from "@/application/infra-protocols/db/stock-market-company-repositories/create-stock-market-company-repository";

export class DbCreateStockMarketCompany implements ICreateStockMarketCompany {

  constructor(
    private readonly creeateStockMarketCompanyRepository: ICreateStockMarketCompanyRepository
  ) {}


  async create({ code, name }: CreateStockMarketCompanyRequest): Promise<IStockMarketCompany> {

    const stockMarketCompany = await this.creeateStockMarketCompanyRepository.create({ code, name });



    return null;
  }

}