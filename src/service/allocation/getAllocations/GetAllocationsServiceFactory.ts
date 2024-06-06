import { makePrismaAllocation } from '../../../data/repository/allocation/AllocationRepositoryFactory'
import { IGetAllocationsService } from '../../../domain/service/allocation/getAllocations/IGetAllocationsService'
import { GetAllocationsService } from './GetAllocationsService'

interface FactoryTypes {
  getAllocationsService: IGetAllocationsService
}

export const makeGetAllocationsService = (): FactoryTypes => {
  const repository = makePrismaAllocation()

  const getAllocationsService = new GetAllocationsService(repository)

  return { getAllocationsService }
}
