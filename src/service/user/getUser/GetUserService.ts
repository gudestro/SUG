import { IUser } from '../../../domain/data/entity/IUser'
import { IUserRepository } from '../../../domain/data/repository/user/IUserRepository'
import { IGetUserService } from '../../../domain/service/user/getUser/IGetuserService'

export class GetUserService implements IGetUserService {
  constructor (private readonly _userRepository: IUserRepository) {}

  async handler (key: string, value: any): Promise<IUser|Error> {
    if (!key || !value) {
      throw new Error('No id provided')
    }

    const user = await this._userRepository.getUser(key, value)

    return user
  }
}
