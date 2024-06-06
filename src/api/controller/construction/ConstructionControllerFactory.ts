import { PrismaNotificationRepository } from '../../../data/repository/notification/NotificationRepository'
import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { makeAllocationService } from '../../../service/allocation/AllocationServiceFactory'
import { makeCompanyService } from '../../../service/company/CompanyServiceFactory'
import { makeConstructionService } from '../../../service/construction/ConstructionServiceFactory'
import { GetNotificationService } from '../../../service/notification/getNotifications/GetReportsService'
import { makeReportService } from '../../../service/report/ReportServiceFactory'
import { makeUserService } from '../../../service/user/UserServiceFactory'
import { ConstructionController } from './ConstructionController'

export const makeConstructionController = (): ConstructionController => {
  const constructionService = makeConstructionService()
  const companyService = makeCompanyService()
  const userService = makeUserService()
  const notificationRepository = new PrismaNotificationRepository(prismaClient.getClient())
  const notificationService = new GetNotificationService(notificationRepository)
  const allocationService = makeAllocationService()
  const reportService = makeReportService()
  return new ConstructionController(constructionService, companyService, userService, notificationService, allocationService, reportService)
}
