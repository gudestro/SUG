import { PrismaNotificationRepository } from '../../../data/repository/notification/NotificationRepository'
import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { makeCompanyService } from '../../../service/company/CompanyServiceFactory'
import { GetNotificationService } from '../../../service/notification/getNotifications/GetReportsService'
import { makeUserService } from '../../../service/user/UserServiceFactory'
import { CompanyController } from './CompanyController'

export const makeCompanyController = (): CompanyController => {
  const companyService = makeCompanyService()
  const userService = makeUserService()
  const notificationRepository = new PrismaNotificationRepository(prismaClient.getClient())
  const notificationService = new GetNotificationService(notificationRepository)
  return new CompanyController(companyService, userService, notificationService)
}
