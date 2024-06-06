import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { UpdateConstructionService } from './UpdateConstructionService'
import { PrismaConstructionRepository } from '../../../data/repository/construction/ConstructionRepository'
import { IUpdateConstructionService } from '../../../domain/service/construction/updateConstruction/IUpdateConstructionService'
import { Validation } from '../../../domain/utils/validator'

interface FactoryTypes {
  updateConstructionService: IUpdateConstructionService
}

export const makeUpdateConstructionService = (validator: Validation): FactoryTypes => {
  const constructionRepository = new PrismaConstructionRepository(prismaClient.getClient())

  const updateConstructionService = new UpdateConstructionService(constructionRepository, validator)

  return { updateConstructionService }
}
