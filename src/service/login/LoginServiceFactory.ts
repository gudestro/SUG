import { LoginService } from './LoginService'
import { ILoginService } from '../../domain/service/login/ILoginService'
import { EncryptAdapter } from '../../infra/cryptography/EncryptAdapter'
import { makePrismaUserRepository } from '../../data/repository/user/UserRepositoryFactory'

interface FactoryTypes {
  loginService: ILoginService
}

export const makeLoginService = (): FactoryTypes => {
  const _salt = parseInt(process.env.SALT)
  const encryptAdapter = new EncryptAdapter(_salt)

  const userRepository = makePrismaUserRepository()

  const loginService = new LoginService(encryptAdapter, userRepository)

  return { loginService }
}
