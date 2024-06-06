import { isValidCPF } from '../../../utils/isValidCPF'
import { IUser } from '../../../domain/data/entity/IUser'
import { Validation } from '../../../domain/utils/validator'
import { IUserRepository } from '../../../domain/data/repository/user/IUserRepository'
import { IUpdateUserService } from '../../../domain/service/user/updateUser/IUpdateUserService'
import { EncryptAdapter } from '../../../infra/cryptography/EncryptAdapter'

export class UpdateUserService implements IUpdateUserService {
  constructor (
    private readonly _userRepository: IUserRepository,
    private readonly _validator: Validation,
    private readonly _hasher: EncryptAdapter) {}

  async handler (user: IUser): Promise<IUser|Error> {
    if (!user.id) {
      throw new Error('A user who already no has an ID cannot be saved.')
    }

    if (!isValidCPF(user.cpf)) {
      return new Error('CPF provido é inválido.')
    }

    const hasIncorrectValue = await this._validator.validate(user)

    if (hasIncorrectValue) {
      return hasIncorrectValue
    }

    const oldUser = await this._userRepository.getUser('email', user.email)

    if (user.password !== oldUser.password) { user.password = await this._hasher.hash(user.password) }

    const result = this._userRepository.updateUser(user)

    return result
  }
}
