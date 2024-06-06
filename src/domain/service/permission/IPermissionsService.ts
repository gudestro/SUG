import { IPermissionsUser } from '../../data/entity/IUserPermissions'

export interface IGetPermissionsService {
  handler (id: number): Promise<IPermissionsUser[]|Error>
}
