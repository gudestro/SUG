import { IAllocation } from '../../../domain/data/entity/IAllocation'
import { IAllocationRepository } from '../../../domain/data/repository/allocation/IAllocationRepository'
import { EOptions, IGetAllocationService } from '../../../domain/service/allocation/getAllocation/IGetAllocationService'

export class GetAllocationService implements IGetAllocationService {
  constructor (private readonly _allocationRepository: IAllocationRepository) {}

  async handler (id: number, option: EOptions): Promise<IAllocation[]|Error> {
    if (!id) {
      return new Error('No id provided')
    }

    let allocation = null

    if (option === EOptions.BY_USER) {
      allocation = await this._allocationRepository.getAllocationByUserId(id)
    }

    if (option === EOptions.BY_ALLOCATION) {
      allocation = [await this._allocationRepository.getAllocation(id)]
    }

    if (option === EOptions.BY_CONSTRUCTION) {
      allocation = await this._allocationRepository.getAllocationByConstructionId(id)
    }

    return allocation
  }
}
