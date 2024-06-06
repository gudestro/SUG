import { isValidCPF } from '../../../utils/isValidCPF'
import { IUser } from '../../../domain/data/entity/IUser'
import { Validation } from '../../../domain/utils/validator'
import { IUserRepository } from '../../../domain/data/repository/user/IUserRepository'
import { ISaveUserService } from '../../../domain/service/user/saveUser/ISaveUserService'
import { EncryptAdapter } from '../../../infra/cryptography/EncryptAdapter'

export class SaveUserService implements ISaveUserService {
  constructor (
    private readonly _userRepository: IUserRepository,
    private readonly _validator: Validation,
    private readonly _hasher: EncryptAdapter) {}

  async handler (user: Omit<IUser, 'id'>): Promise<IUser|Error> {
    // @ts-expect-error
    if (user.id) {
      throw new Error('A user who already has an ID cannot be saved.')
    }

    if (!isValidCPF(user.cpf)) {
      throw new Error('CPF provido é inválido.')
    }

    const hasIncorrectValue = await this._validator.validate(user)

    if (hasIncorrectValue) {
      return hasIncorrectValue
    }

    user.password = await this._hasher.hash(user.password)

    const result = this._userRepository.insertUser(user)

    return result
  }
}
