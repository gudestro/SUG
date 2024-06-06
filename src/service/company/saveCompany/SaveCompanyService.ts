import { ICompany } from '../../../domain/data/entity/ICompany'
import { Validation } from '../../../domain/utils/validator'
import { ICompanyRepository } from '../../../domain/data/repository/company/ICompany'
import { ISaveCompanyService } from '../../../domain/service/company/saveCompany/ISaveCompanyService'

export class SaveCompanyService implements ISaveCompanyService {
  constructor (
    private readonly _companyRepository: ICompanyRepository,
    private readonly _validator: Validation) {}

  async handler (company: Omit<ICompany, 'id'>): Promise<ICompany|Error> {
    // @ts-expect-error
    if (company.id) {
      return new Error('A company who already has an ID cannot be saved.')
    }

    const hasIncorrectValue = await this._validator.validate(company)

    if (hasIncorrectValue) {
      return hasIncorrectValue
    }

    company.createdAt = new Date()

    const result = this._companyRepository.insertCompany(company)

    return result
  }
}
