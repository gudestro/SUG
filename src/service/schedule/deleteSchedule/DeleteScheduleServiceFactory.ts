import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { DeleteScheduleService } from './DeleteScheduleService'
import { PrismaSchedulesRepository } from '../../../data/repository/schedules/SchedulesRepository'
import { IDeleteScheduleService } from '../../../domain/service/schedule/deleteSchedule/IDeleteScheduleService'
import { makeReportService } from '../../report/ReportServiceFactory'

interface FactoryTypes {
  deleteScheduleService: IDeleteScheduleService
}

export const makeDeleteScheduleService = (): FactoryTypes => {
  const scheduleRepository = new PrismaSchedulesRepository(prismaClient.getClient())
  const reportService = makeReportService()

  const deleteScheduleService = new DeleteScheduleService(scheduleRepository, reportService)

  return { deleteScheduleService }
}
