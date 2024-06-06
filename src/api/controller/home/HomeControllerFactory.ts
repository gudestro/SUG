import { PrismaNotificationRepository } from '../../../data/repository/notification/NotificationRepository'
import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { makeAllocationService } from '../../../service/allocation/AllocationServiceFactory'
import { makeConstructionService } from '../../../service/construction/ConstructionServiceFactory'
import { GetNotificationService } from '../../../service/notification/getNotifications/GetReportsService'
import { makeScheduleService } from '../../../service/schedule/ScheduleServiceFactory'
import { makeUserService } from '../../../service/user/UserServiceFactory'
import { HomeController } from './HomeController'

export const makeHomeController = (): HomeController => {
  const userService = makeUserService()
  const scheduleService = makeScheduleService()
  const allocationService = makeAllocationService()
  const constructionService = makeConstructionService()
  const notificationRepository = new PrismaNotificationRepository(prismaClient.getClient())
  const notificationService = new GetNotificationService(notificationRepository)
  return new HomeController(userService, scheduleService, allocationService, constructionService, notificationService)
}
