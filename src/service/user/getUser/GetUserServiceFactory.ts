import { GetUserService } from './GetUserService'
import { IGetUserService } from '../../../domain/service/user/getUser/IGetuserService'
import { makePrismaUserRepository } from '../../../data/repository/user/UserRepositoryFactory'
let getUserService = null
interface FactoryTypes {
  getUserService: IGetUserService
}

export const makeGetUserService = (): FactoryTypes => {
  const userRepository = makePrismaUserRepository()

  getUserService = new GetUserService(userRepository)

  return { getUserService }
}
