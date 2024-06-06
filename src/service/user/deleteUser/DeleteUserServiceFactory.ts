import { DeleteUserService } from './DeleteUserService'
import { IDeleteUserService } from '../../../domain/service/user/deleteUser/IDeleteUserService'
import { makeAllocationService } from '../../allocation/AllocationServiceFactory'
import { makeScheduleService } from '../../schedule/ScheduleServiceFactory'
import { makePrismaUserRepository } from '../../../data/repository/user/UserRepositoryFactory'

interface FactoryTypes {
  deleteService: IDeleteUserService
}

export const makeDeleteUserService = (): FactoryTypes => {
  const userRepository = makePrismaUserRepository()
  const allocationService = makeAllocationService()
  const schedulesService = makeScheduleService()
  const deleteService = new DeleteUserService(userRepository, allocationService, schedulesService)

  return { deleteService }
}
