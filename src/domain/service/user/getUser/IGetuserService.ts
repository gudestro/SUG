import { IUser } from '../../../data/entity/IUser'

export interface IGetUserService {
  handler (key: string, value: any): Promise<IUser|Error>
}
