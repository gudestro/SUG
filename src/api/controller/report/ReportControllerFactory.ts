import { PrismaNotificationRepository } from '../../../data/repository/notification/NotificationRepository'
import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { makeAllocationService } from '../../../service/allocation/AllocationServiceFactory'
import { makeConstructionService } from '../../../service/construction/ConstructionServiceFactory'
import { GetNotificationService } from '../../../service/notification/getNotifications/GetReportsService'
import { makeReportService } from '../../../service/report/ReportServiceFactory'
import { makeScheduleService } from '../../../service/schedule/ScheduleServiceFactory'
import { makeUserService } from '../../../service/user/UserServiceFactory'
import { ReportController } from './ReportController'

export const makeReportController = (): ReportController => {
  const reportService = makeReportService()
  const userService = makeUserService()
  const scheduleService = makeScheduleService()
  const constructionService = makeConstructionService()
  const allocationService = makeAllocationService()
  const notificationRepository = new PrismaNotificationRepository(prismaClient.getClient())
  const notificationService = new GetNotificationService(notificationRepository)
  return new ReportController(reportService, userService, scheduleService, constructionService, allocationService, notificationService)
}
