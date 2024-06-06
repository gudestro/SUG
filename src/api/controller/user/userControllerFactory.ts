import { UserController } from './UserController'
import { makeUserService } from '../../../service/user/UserServiceFactory'
import { PrismaNotificationRepository } from '../../../data/repository/notification/NotificationRepository'
import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { GetNotificationService } from '../../../service/notification/getNotifications/GetReportsService'

export const makeUserController = (): UserController => {
  const userService = makeUserService()
  const notificationRepository = new PrismaNotificationRepository(prismaClient.getClient())
  const notificationService = new GetNotificationService(notificationRepository)
  return new UserController(userService, notificationService)
}
