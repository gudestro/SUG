import { IConstruction } from '../../../domain/data/entity/IConstruction'
import { IAllocationRepository } from '../../../domain/data/repository/allocation/IAllocationRepository'
import { IConstructionRepository } from '../../../domain/data/repository/construction/IConstructionRepository'
import { IDeleteConstructionService } from '../../../domain/service/construction/deleteConstruction/IDeleteConstructionService'

export class DeleteConstructionService implements IDeleteConstructionService {
  constructor (private readonly _constructionRepository: IConstructionRepository,
    private readonly _allocationRepository: IAllocationRepository) {}

  async handler (id: number): Promise<IConstruction|Error> {
    if (!id) {
      throw new Error('No id provided')
    }

    const allocationsToConstruction = await this._allocationRepository.getAllocations()

    const hasAllocationActive = allocationsToConstruction.some(a => a.constructionId === id)

    if (hasAllocationActive) {
      throw new Error('Construção possui alocações.')
    }

    const constructionDeleted = await this._constructionRepository.deleteConstruction(id)

    return constructionDeleted
  }
}
