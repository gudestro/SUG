import { PrismaNotificationRepository } from '../../../data/repository/notification/NotificationRepository'
import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { makeAllocationService } from '../../../service/allocation/AllocationServiceFactory'
import { makeConstructionService } from '../../../service/construction/ConstructionServiceFactory'
import { GetNotificationService } from '../../../service/notification/getNotifications/GetReportsService'
import { makeScheduleService } from '../../../service/schedule/ScheduleServiceFactory'
import { makeUserService } from '../../../service/user/UserServiceFactory'
import { ScheduleController } from './ScheduleController'

export const makeScheduleController = (): ScheduleController => {
  const scheduleService = makeScheduleService()
  const userService = makeUserService()
  const constructionservice = makeConstructionService()
  const allocationService = makeAllocationService()
  const notificationRepository = new PrismaNotificationRepository(prismaClient.getClient())
  const notificationService = new GetNotificationService(notificationRepository)
  return new ScheduleController(scheduleService, userService, constructionservice, allocationService, notificationService)
}
