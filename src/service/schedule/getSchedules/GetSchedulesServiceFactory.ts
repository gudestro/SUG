import { GetSchedulesService } from './GetSchedulesService'
import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { IGetSchedulesService } from '../../../domain/service/schedule/getSchedules/IGetSchedulesService'
import { PrismaSchedulesRepository } from '../../../data/repository/schedules/SchedulesRepository'

interface FactoryTypes {
  getSchedulesService: IGetSchedulesService
}

export const makeGetSchedulesService = (): FactoryTypes => {
  const repository = new PrismaSchedulesRepository(prismaClient.getClient())

  const getSchedulesService = new GetSchedulesService(repository)

  return { getSchedulesService }
}
