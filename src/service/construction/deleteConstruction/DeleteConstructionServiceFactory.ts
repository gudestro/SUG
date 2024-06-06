import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { DeleteConstructionService } from './DeleteConstructionService'
import { PrismaConstructionRepository } from '../../../data/repository/construction/ConstructionRepository'
import { IDeleteConstructionService } from '../../../domain/service/construction/deleteConstruction/IDeleteConstructionService'
import { PrismaAllocationRepository } from '../../../data/repository/allocation/AllocationRepository'

interface FactoryTypes {
  deleteConstructionService: IDeleteConstructionService
}

export const makeDeleteConstructionService = (): FactoryTypes => {
  const constructionRepository = new PrismaConstructionRepository(prismaClient.getClient())

  const allocationRepository = new PrismaAllocationRepository(prismaClient.getClient())

  const deleteConstructionService = new DeleteConstructionService(constructionRepository, allocationRepository)

  return { deleteConstructionService }
}
