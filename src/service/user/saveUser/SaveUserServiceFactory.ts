import { SaveUserService } from './SaveUserService'
import { ISaveUserService } from '../../../domain/service/user/saveUser/ISaveUserService'
import { EncryptAdapter } from '../../../infra/cryptography/EncryptAdapter'
import { makePrismaUserRepository } from '../../../data/repository/user/UserRepositoryFactory'
import { Validation } from '../../../domain/utils/validator'

interface FactoryTypes {
  saveUserService: ISaveUserService
}

export const makeSaveUserService = (validator: Validation): FactoryTypes => {
  const _salt = parseInt(process.env.SALT)
  const encryptAdapter = new EncryptAdapter(_salt)
  const userRepository = makePrismaUserRepository()

  const saveUserService = new SaveUserService(userRepository, validator, encryptAdapter)

  return { saveUserService }
}
