import { prismaClient } from '../../../infra/prisma/PrismaClient'

import { ISaveConstructionService } from '../../../domain/service/construction/saveConstruction/ISaveConstructionService'
import { PrismaConstructionRepository } from '../../../data/repository/construction/ConstructionRepository'
import { SaveConstructionService } from './SaveConstructionService'
import { Validation } from '../../../domain/utils/validator'

interface FactoryTypes {
  saveConstructionService: ISaveConstructionService
}

export const makeSaveConstructionService = (validator: Validation): FactoryTypes => {
  const constructionRepository = new PrismaConstructionRepository(prismaClient.getClient())

  const saveConstructionService = new SaveConstructionService(constructionRepository, validator)

  return { saveConstructionService }
}
