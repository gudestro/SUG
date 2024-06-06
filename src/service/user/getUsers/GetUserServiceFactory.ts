import { IGetUsersService } from '../../../domain/service/user/getUsers/IGetUsersService'
import { GetUsersService } from './GetUsersService'
import { makePrismaUserRepository } from '../../../data/repository/user/UserRepositoryFactory'

interface FactoryTypes {
  getUsersService: IGetUsersService
}

export const makeGetUsersService = (): FactoryTypes => {
  const userRepository = makePrismaUserRepository()

  const getUsersService = new GetUsersService(userRepository)

  return { getUsersService }
}
