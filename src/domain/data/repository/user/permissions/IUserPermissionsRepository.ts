import { PrismaClient } from '@prisma/client'
import { IPermissionsUser } from '../../../entity/IUserPermissions'

export interface IUserPermissionsRepository {
  readonly _prismaClient: PrismaClient
  getPermissionToUserByUserId (userId: number): Promise<IPermissionsUser[]>
  deletePermissionToUser (permissionsUserId: number): Promise<IPermissionsUser>
  insertPermissionToUser (permissionsUser: IPermissionsUser): Promise<IPermissionsUser>
  updatePermissionToUser (permissionsUserId: number, updatedData: IPermissionsUser): Promise<IPermissionsUser>
}
