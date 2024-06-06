import { IGetPermissionsService } from '../../domain/service/permission/IPermissionsService'
import { makeGetPermissionsService } from './getPermissions/GetPermissionsServiceFactory'

export interface IPermissionsService {
  getPermissionsService: IGetPermissionsService
}

export const makeUserService = (): IPermissionsService => {
  const getPermissionsService = makeGetPermissionsService().getPermissionsService

  return {
    getPermissionsService
  }
}
