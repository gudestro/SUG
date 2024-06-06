import { IUser } from '../../../data/entity/IUser'

export interface IUpdateUserService {
  handler (user: IUser): Promise<IUser|Error>
}
