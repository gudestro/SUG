import { PrismaClient } from '@prisma/client'
import { prismaClient } from './PrismaClient'

describe('prismaClient', () => {
  let originalPrismaClient: PrismaClient

  beforeAll(() => {
    originalPrismaClient = prismaClient._prismaClient
  })

  beforeEach(() => {
    prismaClient._prismaClient = null
  })

  afterEach(() => {
    prismaClient._prismaClient = originalPrismaClient
  })

  it('should return a PrismaClient instance', () => {
    const client = prismaClient.getClient()
    expect(client).toBeInstanceOf(PrismaClient)
  })

  it('should return the same instance on subsequent calls', () => {
    const client1 = prismaClient.getClient()
    const client2 = prismaClient.getClient()
    expect(client1).toBe(client2)
  })
})
