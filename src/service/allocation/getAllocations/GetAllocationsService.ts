import { IAllocation } from '../../../domain/data/entity/IAllocation'
import { IAllocationRepository } from '../../../domain/data/repository/allocation/IAllocationRepository'
import { IGetAllocationsService } from '../../../domain/service/allocation/getAllocations/IGetAllocationsService'

export class GetAllocationsService implements IGetAllocationsService {
  constructor (private readonly _allocationRepository: IAllocationRepository) {}

  async handler (): Promise<IAllocation[]|Error> {
    const allocations = await this._allocationRepository.getAllocations()

    return allocations
  }
}
