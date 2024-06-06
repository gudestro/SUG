import { GetReportsService } from './GetReportsService'
import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { PrismaReportRepository } from '../../../data/repository/report/ReportRepository'
import { IGetReportsService } from '../../../domain/service/report/getReports/IGetReportsService'

interface FactoryTypes {
  getReportsService: IGetReportsService
}

export const makeGetReportsService = (): FactoryTypes => {
  const repository = new PrismaReportRepository(prismaClient.getClient())

  const getReportsService = new GetReportsService(repository)

  return { getReportsService }
}
