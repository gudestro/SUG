import { PrismaClient } from '@prisma/client'
import { IPermission } from '../../../domain/data/entity/IPermission'
import { PrismaPermissionRepository } from './PermissionsRepository'

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    permission: {
      findUnique: jest.fn()
    }
  }))
}))

interface SutTypes {
  prismaMock: PrismaClient
  sut: PrismaPermissionRepository
}

const makeSut = (): SutTypes => {
  const prismaMock = new PrismaClient()
  const sut = new PrismaPermissionRepository(prismaMock)

  return {
    sut,
    prismaMock
  }
}

describe('PrismaPermissionRepository', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should get permission by id', async () => {
    const { sut, prismaMock } = makeSut()

    const permissionId = 1
    const permissionData: IPermission = {
      id: permissionId,
      description: 'Permission 1'
    }

    // @ts-expect-error
    prismaMock.permission.findUnique.mockResolvedValue(permissionData)

    const result = await sut.get(permissionId)

    expect(result).toEqual(permissionData)
    expect(prismaMock.permission.findUnique).toHaveBeenCalledWith({ where: { id: permissionId } })
  })

  it('should return null when getting non-existing permission by id', async () => {
    const { sut, prismaMock } = makeSut()

    const permissionId = 1

    // @ts-expect-error
    prismaMock.permission.findUnique.mockResolvedValue(null)

    const result = await sut.get(permissionId)

    expect(result).toBeNull()
    expect(prismaMock.permission.findUnique).toHaveBeenCalledWith({ where: { id: permissionId } })
  })
})
