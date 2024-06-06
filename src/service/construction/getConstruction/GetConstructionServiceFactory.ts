import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { GetConstructionService } from './GetConstructionService'
import { PrismaConstructionRepository } from '../../../data/repository/construction/ConstructionRepository'
import { IGetConstructionService } from '../../../domain/service/construction/getConstruction/IGetConstructionService'
let getConstructionService = null

interface FactoryTypes {
  getConstructionService: IGetConstructionService
}

export const makeGetConstructionService = (): FactoryTypes => {
  if (!getConstructionService) {
    const constructionRepository = new PrismaConstructionRepository(prismaClient.getClient())

    getConstructionService = new GetConstructionService(constructionRepository)
  }

  return { getConstructionService }
}
