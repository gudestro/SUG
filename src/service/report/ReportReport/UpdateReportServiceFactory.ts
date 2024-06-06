import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { makeReportValidation } from '../ReportValidation'
import { UpdateReportService } from './UpdateReportService'
import { PrismaReportRepository } from '../../../data/repository/report/ReportRepository'
import { IUpdateReportService } from '../../../domain/service/report/updateReport/IUpdateReportService'

interface FactoryTypes {
  updateReportService: IUpdateReportService
}

export const makeUpdateReportService = (): FactoryTypes => {
  const validator = makeReportValidation()
  const repository = new PrismaReportRepository(prismaClient.getClient())

  const updateReportService = new UpdateReportService(repository, validator)

  return { updateReportService }
}
