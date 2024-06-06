import { UpdateUserService } from './UpdateUserService'
import { EncryptAdapter } from '../../../infra/cryptography/EncryptAdapter'
import { IUpdateUserService } from '../../../domain/service/user/updateUser/IUpdateUserService'
import { makePrismaUserRepository } from '../../../data/repository/user/UserRepositoryFactory'
import { Validation } from '../../../domain/utils/validator'

interface FactoryTypes {
  updateUserService: IUpdateUserService
}

export const makeUpdateUserService = (validator: Validation): FactoryTypes => {
  const _salt = parseInt(process.env.SALT)
  const encryptAdapter = new EncryptAdapter(_salt)
  const userRepository = makePrismaUserRepository()

  const updateUserService = new UpdateUserService(userRepository, validator, encryptAdapter)

  return { updateUserService }
}
