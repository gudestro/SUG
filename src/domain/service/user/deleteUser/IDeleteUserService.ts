import { IUser } from '../../../data/entity/IUser'

export interface IDeleteUserService {
  handler (id: number): Promise<IUser|Error>
}
