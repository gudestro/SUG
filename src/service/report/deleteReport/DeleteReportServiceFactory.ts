import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { DeleteReportService } from './DeleteReportService'
import { PrismaReportRepository } from '../../../data/repository/report/ReportRepository'
import { IDeleteReportService } from '../../../domain/service/report/deleteReport/IDeleteReportService'

interface FactoryTypes {
  deleteReportService: IDeleteReportService
}

export const makeDeleteReportService = (): FactoryTypes => {
  const reportRepository = new PrismaReportRepository(prismaClient.getClient())

  const deleteReportService = new DeleteReportService(reportRepository)

  return { deleteReportService }
}
