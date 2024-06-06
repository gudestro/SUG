import { PrismaClient } from '@prisma/client'

export const prismaClient = {
  _prismaClient: null as PrismaClient,

  getClient (): PrismaClient {
    if (!this._prismaClient) {
      this._prismaClient = new PrismaClient()
    }
    return this._prismaClient
  }
}
