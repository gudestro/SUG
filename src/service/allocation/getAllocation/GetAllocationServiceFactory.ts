import { makePrismaAllocation } from '../../../data/repository/allocation/AllocationRepositoryFactory'
import { IGetAllocationService } from '../../../domain/service/allocation/getAllocation/IGetAllocationService'
import { GetAllocationService } from './GetAllocationService'

interface FactoryTypes {
  getAllocationService: IGetAllocationService
}

export const makeGetAllocationService = (): FactoryTypes => {
  const allocationRepository = makePrismaAllocation()

  const getAllocationService = new GetAllocationService(allocationRepository)

  return { getAllocationService }
}
