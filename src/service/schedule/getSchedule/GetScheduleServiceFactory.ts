import { GetScheduleService } from './GetScheduleService'
import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { IGetScheduleService } from '../../../domain/service/schedule/getSchedule/IGetScheduleService'
import { PrismaSchedulesRepository } from '../../../data/repository/schedules/SchedulesRepository'

interface FactoryTypes {
  getScheduleService: IGetScheduleService
}

export const makeGetScheduleService = (): FactoryTypes => {
  const scheduleRepository = new PrismaSchedulesRepository(prismaClient.getClient())

  const getScheduleService = new GetScheduleService(scheduleRepository)

  return { getScheduleService }
}
