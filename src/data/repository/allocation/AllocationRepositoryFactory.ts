import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { PrismaAllocationRepository } from './AllocationRepository'

let prismaAllocation: PrismaAllocationRepository = null

export const makePrismaAllocation = (): PrismaAllocationRepository => {
  if (!prismaAllocation) {
    prismaAllocation = new PrismaAllocationRepository(prismaClient.getClient())
  }

  return prismaAllocation
}
