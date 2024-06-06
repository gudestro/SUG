import { GetReportService } from './GetReportService'
import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { PrismaReportRepository } from '../../../data/repository/report/ReportRepository'
import { IGetReportService } from '../../../domain/service/report/getReport/IGetReportService'

interface FactoryTypes {
  getReportService: IGetReportService
}

export const makeGetReportService = (): FactoryTypes => {
  const reportRepository = new PrismaReportRepository(prismaClient.getClient())

  const getReportService = new GetReportService(reportRepository)

  return { getReportService }
}
