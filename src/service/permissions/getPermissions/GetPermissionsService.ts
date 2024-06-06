import { IPermissionsUser } from '../../../domain/data/entity/IUserPermissions'
import { IGetPermissionsService } from '../../../domain/service/permission/IPermissionsService'
import { IUserPermissionsRepository } from '../../../domain/data/repository/user/permissions/IUserPermissionsRepository'

export class GetPermissionsService implements IGetPermissionsService {
  constructor (private readonly _permissionRepository: IUserPermissionsRepository) {}

  async handler (id: number): Promise<IPermissionsUser[]|Error> {
    if (!id) {
      throw new Error('No id provided')
    }

    const permissions = await this._permissionRepository.getPermissionToUserByUserId(id)

    return permissions
  }
}
