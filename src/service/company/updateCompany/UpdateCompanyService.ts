import { Validation } from '../../../domain/utils/validator'
import { ICompany } from '../../../domain/data/entity/ICompany'
import { ICompanyRepository } from '../../../domain/data/repository/company/ICompany'
import { IUpdateCompanyService } from '../../../domain/service/company/updateCompany/IUpdateCompanyService'

export class UpdateCompanyService implements IUpdateCompanyService {
  constructor (
    private readonly _companyRepository: ICompanyRepository,
    private readonly _validator: Validation) {}

  async handler (company: ICompany): Promise<ICompany|Error> {
    if (!company.id) {
      throw new Error('A company who already no has an ID cannot be saved.')
    }

    const hasIncorrectValue = await this._validator.validate(company)

    if (hasIncorrectValue) {
      return hasIncorrectValue
    }

    company.updatedAt = new Date()

    const result = this._companyRepository.updateCompany(company)

    return result
  }
}
