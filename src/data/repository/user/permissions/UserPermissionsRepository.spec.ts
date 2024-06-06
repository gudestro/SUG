import { PrismaClient } from '@prisma/client'
import { IPermissionsUser } from '../../../../domain/data/entity/IUserPermissions'
import { PrismaPermissionsUserRepository } from './UserPermissionsRepository'

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    permissionsUser: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn()
    }
  }))
}))

interface SutTypes {
  prismaMock: PrismaClient
  sut: PrismaPermissionsUserRepository
}

const makeSut = (): SutTypes => {
  const prismaMock = new PrismaClient()
  const sut = new PrismaPermissionsUserRepository(prismaMock)

  return {
    sut,
    prismaMock
  }
}

describe('PrismaPermissionsUserRepository', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should insert permissions to user', async () => {
    const { sut, prismaMock } = makeSut()

    const permissionsUser: Omit<IPermissionsUser, 'id'> = {
      userId: 1,
      permissionId: 1
    }

    // @ts-expect-error
    prismaMock.permissionsUser.findFirst.mockResolvedValue(null)
    // @ts-expect-error
    prismaMock.permissionsUser.create.mockResolvedValue(permissionsUser)

    const result = await sut.insertPermissionToUser(permissionsUser)

    expect(result).toEqual(permissionsUser)
    expect(prismaMock.permissionsUser.findFirst).toHaveBeenCalledWith({
      where: { permissionId: permissionsUser.permissionId, userId: permissionsUser.userId }
    })
    expect(prismaMock.permissionsUser.create).toHaveBeenCalledWith({ data: permissionsUser })
  })

  it('should throw error when inserting existing permissions to user', async () => {
    const { sut, prismaMock } = makeSut()

    const permissionsUser: IPermissionsUser = {
      id: 1,
      userId: 1,
      permissionId: 1
    }

    // @ts-expect-error
    prismaMock.permissionsUser.findFirst.mockResolvedValue(permissionsUser)

    await expect(sut.insertPermissionToUser(permissionsUser)).rejects.toThrowError(
      '[ENTITY- PERMISSIONS_USER]: Relação de permissões de usuário já existe'
    )
  })

  it('should update permissions to user', async () => {
    const { sut, prismaMock } = makeSut()

    const permissionsUserId = 1
    const updatedPermissionsUser: IPermissionsUser = {
      id: permissionsUserId,
      userId: 1,
      permissionId: 2
    }

    // @ts-expect-error
    prismaMock.permissionsUser.findUnique.mockResolvedValue(updatedPermissionsUser)
    // @ts-expect-error
    prismaMock.permissionsUser.update.mockResolvedValue(updatedPermissionsUser)

    const result = await sut.updatePermissionToUser(permissionsUserId, updatedPermissionsUser)

    expect(result).toEqual(updatedPermissionsUser)
    expect(prismaMock.permissionsUser.findUnique).toHaveBeenCalledWith({ where: { id: permissionsUserId } })
    expect(prismaMock.permissionsUser.update).toHaveBeenCalledWith({
      where: { id: permissionsUserId },
      data: updatedPermissionsUser
    })
  })

  it('should throw error when updating non-existing permissions to user', async () => {
    const { sut, prismaMock } = makeSut()

    const permissionsUserId = 1
    const updatedPermissionsUser: IPermissionsUser = {
      id: permissionsUserId,
      userId: 1,
      permissionId: 2
    }

    // @ts-expect-error
    prismaMock.permissionsUser.findUnique.mockResolvedValue(null)

    await expect(sut.updatePermissionToUser(permissionsUserId, updatedPermissionsUser)).rejects.toThrowError(
      '[ENTITY- PERMISSIONS_USER]: Relação de permissões de usuário não encontrada'
    )
  })

  it('should get permissions to user by userId', async () => {
    const { sut, prismaMock } = makeSut()

    const userId = 1
    const permissionsUsers: IPermissionsUser[] = [
      { id: 1, userId, permissionId: 1 },
      { id: 2, userId, permissionId: 2 }
    ]

    // @ts-expect-error
    prismaMock.permissionsUser.findMany.mockResolvedValue(permissionsUsers)

    const result = await sut.getPermissionToUserByUserId(userId)

    expect(result).toEqual(permissionsUsers)
    expect(prismaMock.permissionsUser.findMany).toHaveBeenCalledWith({ where: { userId } })
  })

  it('should delete permissions to user', async () => {
    const { sut, prismaMock } = makeSut()

    const permissionsUserId = 1
    const permissionsUser: IPermissionsUser = {
      id: permissionsUserId,
      userId: 1,
      permissionId: 1
    }

    // @ts-expect-error
    prismaMock.permissionsUser.findUnique.mockResolvedValue(permissionsUser)
    // @ts-expect-error
    prismaMock.permissionsUser.delete.mockResolvedValue(permissionsUser)

    const result = await sut.deletePermissionToUser(permissionsUserId)

    expect(result).toEqual(permissionsUser)
    expect(prismaMock.permissionsUser.findUnique).toHaveBeenCalledWith({ where: { id: permissionsUserId } })
    expect(prismaMock.permissionsUser.delete).toHaveBeenCalledWith({ where: { id: permissionsUserId } })
  })

  it('should throw error when deleting non-existing permissions to user', async () => {
    const { sut, prismaMock } = makeSut()

    const permissionsUserId = 1

    // @ts-expect-error
    prismaMock.permissionsUser.findUnique.mockResolvedValue(null)

    await expect(sut.deletePermissionToUser(permissionsUserId)).rejects.toThrowError(
      '[ENTITY- PERMISSIONS_USER]: Relação de permissões de usuário não encontrada'
    )
  })
})
