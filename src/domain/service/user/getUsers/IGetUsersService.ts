import { IUser } from '../../../data/entity/IUser'

export interface IGetUsersService {
  handler (): Promise<IUser[]|Error>
}
