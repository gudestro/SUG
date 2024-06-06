import { IConstruction } from '../../../domain/data/entity/IConstruction'
import { IConstructionRepository } from '../../../domain/data/repository/construction/IConstructionRepository'
import { IGetConstructionsService } from '../../../domain/service/construction/getConstructions/IGetConstructionsService'

export class GetConstructionsService implements IGetConstructionsService {
  constructor (private readonly _constructionRepository: IConstructionRepository) {}

  async handler (): Promise<IConstruction[]|Error> {
    const constructions = await this._constructionRepository.getConstructions()

    return constructions
  }
}
