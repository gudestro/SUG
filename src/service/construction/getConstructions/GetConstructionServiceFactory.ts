import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { GetConstructionsService } from './GetConstructionsService'
import { IGetConstructionsService } from '../../../domain/service/construction/getConstructions/IGetConstructionsService'
import { PrismaConstructionRepository } from '../../../data/repository/construction/ConstructionRepository'

interface FactoryTypes {
  getConstructionsService: IGetConstructionsService
}

export const makeGetConstructionsService = (): FactoryTypes => {
  const constructionRepository = new PrismaConstructionRepository(prismaClient.getClient())

  const getConstructionsService = new GetConstructionsService(constructionRepository)

  return { getConstructionsService }
}
