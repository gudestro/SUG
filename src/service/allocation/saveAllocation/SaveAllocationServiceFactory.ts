import { makePrismaAllocation } from '../../../data/repository/allocation/AllocationRepositoryFactory'
import { PrismaConstructionRepository } from '../../../data/repository/construction/ConstructionRepository'
import { PrismaNotificationRepository } from '../../../data/repository/notification/NotificationRepository'
import { makePrismaUserRepository } from '../../../data/repository/user/UserRepositoryFactory'
import { ISaveAllocationService } from '../../../domain/service/allocation/saveAllocation/ISaveAllocationService'
import { Validation } from '../../../domain/utils/validator'
import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { makeScheduleService } from '../../schedule/ScheduleServiceFactory'
import { SaveAllocationService } from './SaveAllocationService'
let saveAllocationService = null
interface FactoryTypes {
  saveAllocationService: ISaveAllocationService
}

export const makeSaveAllocationService = (validator: Validation): FactoryTypes => {
  const repository = makePrismaAllocation()

  const userRepo = makePrismaUserRepository()
  const constructionService = new PrismaConstructionRepository(prismaClient.getClient())
  const notificationRepository = new PrismaNotificationRepository(prismaClient.getClient())

  const scheduleService = makeScheduleService()

  saveAllocationService = new SaveAllocationService(validator, userRepo, repository, constructionService, scheduleService, notificationRepository)

  return { saveAllocationService }
}
