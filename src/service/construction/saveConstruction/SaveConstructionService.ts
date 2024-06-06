import { Validation } from '../../../domain/utils/validator'
import { IConstruction } from '../../../domain/data/entity/IConstruction'
import { IConstructionRepository } from '../../../domain/data/repository/construction/IConstructionRepository'
import { ISaveConstructionService } from '../../../domain/service/construction/saveConstruction/ISaveConstructionService'

export class SaveConstructionService implements ISaveConstructionService {
  constructor (
    private readonly _constructionRepository: IConstructionRepository,
    private readonly _validator: Validation) {}

  async handler (construction: Omit<IConstruction, 'id'>): Promise<IConstruction|Error> {
    // @ts-expect-error
    if (construction.id) {
      return new Error('A construction who already has an ID cannot be saved.')
    }
    const hasIncorrectValue = await this._validator.validate(construction)

    if (hasIncorrectValue) {
      return hasIncorrectValue
    }

    const result = this._constructionRepository.insertConstruction(construction)

    return result
  }
}
