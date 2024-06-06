import { PrismaClient } from '@prisma/client'
import { IPermission } from '../../../domain/data/entity/IPermission'

export class PrismaPermissionRepository {
  constructor (private readonly _prismaClient: PrismaClient) {}

  async get (permissionId: number): Promise<IPermission | null> {
    return this._prismaClient.permission.findUnique({
      where: { id: permissionId }
    })
  }
}
