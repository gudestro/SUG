import { PrismaNotificationRepository } from '../../../data/repository/notification/NotificationRepository'
import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { makeAllocationService } from '../../../service/allocation/AllocationServiceFactory'
import { makeConstructionService } from '../../../service/construction/ConstructionServiceFactory'
import { GetNotificationService } from '../../../service/notification/getNotifications/GetReportsService'
import { makeUserService } from '../../../service/user/UserServiceFactory'
import { AllocationController } from './AllocationController'

export const makeAllocationController = (): AllocationController => {
  const allocationService = makeAllocationService()
  const userService = makeUserService()
  const constructionService = makeConstructionService()
  const notificationRepository = new PrismaNotificationRepository(prismaClient.getClient())
  const notificationService = new GetNotificationService(notificationRepository)
  return new AllocationController(allocationService, userService, constructionService, notificationService)
}
