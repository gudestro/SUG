import { IUser } from '../../../data/entity/IUser'

export interface ISaveUserService {
  handler (user: Omit<IUser, 'id'>): Promise<IUser|Error>
}
