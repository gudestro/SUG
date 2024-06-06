import { IUser } from '../../domain/data/entity/IUser'
import { IHasher } from '../../domain/infra/criptography/IHasher'
import { ILoginService } from '../../domain/service/login/ILoginService'
import { IUserRepository } from '../../domain/data/repository/user/IUserRepository'

export class LoginService implements ILoginService {
  constructor (private readonly _hasher: IHasher, private readonly _userRepository: IUserRepository) {}

  async handler (email: string, password: string): Promise<IUser|Error> {
    if (!email || !password) {
      return new Error('Email e senha não foram providos.')
    }

    const user = await this._userRepository.getUser('email', email)

    if (!user) {
      return new Error(`O e-mail ${email} não está associado a nenhuma cadastro.`)
    }

    const isMatch = await this._hasher.compare(password, user.password)

    return isMatch ? user : new Error('Senha incorreta')
  }
}
