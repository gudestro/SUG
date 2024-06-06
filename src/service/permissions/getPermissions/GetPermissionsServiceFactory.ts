import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { GetPermissionsService } from './GetPermissionsService'
import { IGetPermissionsService } from '../../../domain/service/permission/IPermissionsService'
import { PrismaPermissionsUserRepository } from '../../../data/repository/user/permissions/UserPermissionsRepository'

interface FactoryTypes {
  getPermissionsService: IGetPermissionsService
}

export const makeGetPermissionsService = (): FactoryTypes => {
  const permissionsRepository = new PrismaPermissionsUserRepository(prismaClient.getClient())

  const getPermissionsService = new GetPermissionsService(permissionsRepository)

  return { getPermissionsService }
}
