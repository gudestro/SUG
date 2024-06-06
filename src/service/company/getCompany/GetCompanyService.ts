import { ICompany } from '../../../domain/data/entity/ICompany'
import { ICompanyRepository } from '../../../domain/data/repository/company/ICompany'
import { IGetCompanyService } from '../../../domain/service/company/getCompany/IGetCompanyService'

export class GetCompanyService implements IGetCompanyService {
  constructor (private readonly _companyRepository: ICompanyRepository) {}

  async handler (id: number): Promise<ICompany|Error> {
    if (!id) {
      return new Error('No id provided')
    }

    const company = await this._companyRepository.getCompany(id)

    return company
  }
}
