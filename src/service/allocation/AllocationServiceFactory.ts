import { makeGetAllocationService } from './getAllocation/GetAllocationServiceFactory'
import { makeGetAllocationsService } from './getAllocations/GetAllocationsServiceFactory'
import { makeSaveAllocationService } from './saveAllocation/SaveAllocationServiceFactory'
import { makeDeleteAllocationService } from './deleteAllocation/DeleteAllocationServiceFactory'
import { makeUpdateAllocationService } from './updateAllocation/UpdateAllocationServiceFactory'
import { IGetAllocationService } from '../../domain/service/allocation/getAllocation/IGetAllocationService'
import { IGetAllocationsService } from '../../domain/service/allocation/getAllocations/IGetAllocationsService'
import { ISaveAllocationService } from '../../domain/service/allocation/saveAllocation/ISaveAllocationService'
import { IDeleteAllocationService } from '../../domain/service/allocation/deleteAllocation/IDeleteAllocationService'
import { IUpdateAllocationService } from '../../domain/service/allocation/updateAllocation/IUpdateAllocationService'
import { makeAllocationValidation } from './AllocationValidation'

let allocationService: IAllocationService = null
export interface IAllocationService {
  getAllocationService: IGetAllocationService
  getAllocationsService: IGetAllocationsService
  saveAllocationService: ISaveAllocationService
  updateAllocationService: IUpdateAllocationService
  deleteAllocationService: IDeleteAllocationService
}

export const makeAllocationService = (): IAllocationService => {
  if (!allocationService) {
    const validator = makeAllocationValidation()
    const getAllocationService = makeGetAllocationService().getAllocationService
    const saveAllocationService = makeSaveAllocationService(validator).saveAllocationService
    const updateAllocationService = makeUpdateAllocationService(validator).updateAllocationService
    const deleteAllocationService = makeDeleteAllocationService().deleteAllocationService
    const getAllocationsService = makeGetAllocationsService().getAllocationsService

    allocationService = {
      getAllocationService,
      saveAllocationService,
      updateAllocationService,
      deleteAllocationService,
      getAllocationsService
    }
  }

  return allocationService
}
