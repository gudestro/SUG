import { IUser } from '../../data/entity/IUser'

export interface ILoginService {
  handler (email: string, password: string): Promise<IUser|Error>
}
