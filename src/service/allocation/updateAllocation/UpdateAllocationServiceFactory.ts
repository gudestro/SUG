import { UpdateAllocationService } from './UpdateAllocationService'
import { IUpdateAllocationService } from '../../../domain/service/allocation/updateAllocation/IUpdateAllocationService'
import { makePrismaAllocation } from '../../../data/repository/allocation/AllocationRepositoryFactory'
import { Validation } from '../../../domain/utils/validator'
import { PrismaUserRepository } from '../../../data/repository/user/UserRepository'
import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { PrismaConstructionRepository } from '../../../data/repository/construction/ConstructionRepository'
let updateAllocationService = null
interface FactoryTypes {
  updateAllocationService: IUpdateAllocationService
}

export const makeUpdateAllocationService = (validator: Validation): FactoryTypes => {
  const repository = makePrismaAllocation()
  const userRepository = new PrismaUserRepository(prismaClient.getClient())
  const constructionRepository = new PrismaConstructionRepository(prismaClient.getClient())

  updateAllocationService = new UpdateAllocationService(repository, validator, userRepository, constructionRepository)

  return { updateAllocationService }
}
