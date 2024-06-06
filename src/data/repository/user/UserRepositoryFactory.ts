import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { PrismaUserRepository } from './UserRepository'

let userAllocation: PrismaUserRepository = null

export const makePrismaUserRepository = (): PrismaUserRepository => {
  if (!userAllocation) {
    userAllocation = new PrismaUserRepository(prismaClient.getClient())
  }

  return userAllocation
}
