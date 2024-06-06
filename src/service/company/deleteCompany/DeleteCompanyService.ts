import { ICompany } from '../../../domain/data/entity/ICompany'
import { EStatus } from '../../../domain/data/entity/ISchedule'
import { ICompanyRepository } from '../../../domain/data/repository/company/ICompany'
import { IConstructionRepository } from '../../../domain/data/repository/construction/IConstructionRepository'
import { IDeleteCompanyService } from '../../../domain/service/company/deleteCompany/IDeleteCompanyService'

export class DeleteCompanyService implements IDeleteCompanyService {
  constructor (private readonly _companyRepository: ICompanyRepository,
    private readonly _constructionRepository: IConstructionRepository) {}

  async handler (id: number): Promise<ICompany|Error> {
    if (!id) {
      throw new Error('No id provided')
    }

    const constructions = await this._constructionRepository.getConstructions()

    const hasConstructionsActive = constructions.some(c => c.companyId === id && c.status === EStatus.active)

    if (hasConstructionsActive) {
      throw new Error('Possui construção ativa para essa companhia.')
    }

    const companyDeleted = await this._companyRepository.deleteCompany(id)

    return companyDeleted
  }
}
