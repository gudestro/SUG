import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { ISaveScheduleService } from '../../../domain/service/schedule/saveSchedule/ISaveScheduleService'
import { SaveScheduleService } from './SaveScheduleService'
import { PrismaSchedulesRepository } from '../../../data/repository/schedules/SchedulesRepository'
import { makePrismaUserRepository } from '../../../data/repository/user/UserRepositoryFactory'
import { PrismaConstructionRepository } from '../../../data/repository/construction/ConstructionRepository'
import { Validation } from '../../../domain/utils/validator'
import { PrismaNotificationRepository } from '../../../data/repository/notification/NotificationRepository'

interface FactoryTypes {
  saveScheduleService: ISaveScheduleService
}

export const makeSaveScheduleService = (validator: Validation): FactoryTypes => {
  const repository = new PrismaSchedulesRepository(prismaClient.getClient())

  const userRepo = makePrismaUserRepository()
  const constructionRepository = new PrismaConstructionRepository(prismaClient.getClient())
  const notificationRepository = new PrismaNotificationRepository(prismaClient.getClient())

  const saveScheduleService = new SaveScheduleService(repository, validator, userRepo, constructionRepository, notificationRepository)

  return { saveScheduleService }
}
