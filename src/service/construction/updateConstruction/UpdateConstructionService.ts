import { Validation } from '../../../domain/utils/validator'
import { IConstruction } from '../../../domain/data/entity/IConstruction'
import { IConstructionRepository } from '../../../domain/data/repository/construction/IConstructionRepository'
import { IUpdateConstructionService } from '../../../domain/service/construction/updateConstruction/IUpdateConstructionService'

export class UpdateConstructionService implements IUpdateConstructionService {
  constructor (
    private readonly _constructionRepository: IConstructionRepository,
    private readonly _validator: Validation) {}

  async handler (construction: IConstruction): Promise<IConstruction|Error> {
    if (!construction.id) {
      return new Error('A construction who already no has an ID cannot be saved.')
    }

    const hasIncorrectValue = await this._validator.validate(construction)

    if (hasIncorrectValue) {
      return hasIncorrectValue
    }

    construction.updatedAt = new Date()

    const result = this._constructionRepository.updateConstruction(construction)

    return result
  }
}
