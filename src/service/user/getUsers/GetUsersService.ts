import { IUser } from '../../../domain/data/entity/IUser'
import { IUserRepository } from '../../../domain/data/repository/user/IUserRepository'
import { IGetUsersService } from '../../../domain/service/user/getUsers/IGetUsersService'

export class GetUsersService implements IGetUsersService {
  constructor (private readonly _userRepository: IUserRepository) {}

  async handler (): Promise<IUser[]|Error> {
    const users = await this._userRepository.getUsers()

    return users
  }
}
