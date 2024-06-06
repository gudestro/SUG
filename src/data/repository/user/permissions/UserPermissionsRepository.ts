import { PrismaClient } from '@prisma/client'
import { IPermissionsUser } from '../../../../domain/data/entity/IUserPermissions'
import { IUserPermissionsRepository } from '../../../../domain/data/repository/user/permissions/IUserPermissionsRepository'

export class PrismaPermissionsUserRepository implements IUserPermissionsRepository {
  constructor (readonly _prismaClient: PrismaClient) {}

  async insertPermissionToUser (permissionsUser: Omit<IPermissionsUser, 'id'>): Promise<IPermissionsUser> {
    const existingPermissionsUser = await this._prismaClient.permissionsUser.findFirst({
      where: {
        permissionId: permissionsUser.permissionId,
        userId: permissionsUser.userId
      }
    })

    if (existingPermissionsUser) {
      throw new Error('[ENTITY- PERMISSIONS_USER]: Relação de permissões de usuário já existe')
    }

    const register = this._prismaClient.permissionsUser.create({
      data: permissionsUser
    })

    return register
  }

  async updatePermissionToUser (permissionsUserId: number, updatedData: IPermissionsUser): Promise<IPermissionsUser> {
    const existingPermissionsUser = await this._prismaClient.permissionsUser.findUnique({
      where: { id: permissionsUserId }
    })

    if (!existingPermissionsUser) {
      throw new Error('[ENTITY- PERMISSIONS_USER]: Relação de permissões de usuário não encontrada')
    }

    const register = this._prismaClient.permissionsUser.update({
      where: { id: permissionsUserId },
      data: updatedData
    })

    return register
  }

  async getPermissionToUserByUserId (userId: number): Promise<IPermissionsUser[]> {
    const register = this._prismaClient.permissionsUser.findMany({
      where: { userId }
    })

    return register
  }

  async deletePermissionToUser (permissionsUserId: number): Promise<IPermissionsUser> {
    const existingPermissionsUser = await this._prismaClient.permissionsUser.findUnique({
      where: { id: permissionsUserId }
    })

    if (!existingPermissionsUser) {
      throw new Error('[ENTITY- PERMISSIONS_USER]: Relação de permissões de usuário não encontrada')
    }

    const register = this._prismaClient.permissionsUser.delete({
      where: { id: permissionsUserId }
    })

    return register
  }
}
