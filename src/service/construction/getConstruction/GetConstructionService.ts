import { IConstruction } from '../../../domain/data/entity/IConstruction'
import { IConstructionRepository } from '../../../domain/data/repository/construction/IConstructionRepository'
import { IGetConstructionService } from '../../../domain/service/construction/getConstruction/IGetConstructionService'

export class GetConstructionService implements IGetConstructionService {
  constructor (private readonly _constructionRepository: IConstructionRepository) {}

  async handler (key: string, value: any): Promise<IConstruction|Error> {
    if (!value) {
      return new Error('No value provided')
    }

    const construction = await this._constructionRepository.getConstruction(key, value)

    return construction
  }
}
