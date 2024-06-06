import { ICompany } from '../../../domain/data/entity/ICompany'
import { ICompanyRepository } from '../../../domain/data/repository/company/ICompany'
import { IGetCompaniesService } from '../../../domain/service/company/getCompanies/IGetCompaniesService'

export class GetCompaniesService implements IGetCompaniesService {
  constructor (private readonly _companyRepository: ICompanyRepository) {}

  async handler (): Promise<ICompany[]|Error> {
    const companies = await this._companyRepository.getCompanies()

    return companies
  }
}
