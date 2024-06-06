import { makePrismaAllocation } from '../../../data/repository/allocation/AllocationRepositoryFactory'
import { IDeleteAllocationService } from '../../../domain/service/allocation/deleteAllocation/IDeleteAllocationService'
import { makeScheduleService } from '../../schedule/ScheduleServiceFactory'
import { DeleteAllocationService } from './DeleteAllocationService'

interface FactoryTypes {
  deleteAllocationService: IDeleteAllocationService
}

export const makeDeleteAllocationService = (): FactoryTypes => {
  const allocationRepository = makePrismaAllocation()

  const scheduleService = makeScheduleService()

  const deleteAllocationService = new DeleteAllocationService(allocationRepository, scheduleService)

  return { deleteAllocationService }
}
