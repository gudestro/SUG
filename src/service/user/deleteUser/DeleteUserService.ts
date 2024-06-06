import { IAllocation } from '../../../domain/data/entity/IAllocation'
import { EStatus, ISchedule } from '../../../domain/data/entity/ISchedule'
import { IUser } from '../../../domain/data/entity/IUser'
import { IUserRepository } from '../../../domain/data/repository/user/IUserRepository'
import { EOptions } from '../../../domain/service/allocation/getAllocation/IGetAllocationService'
import { IDeleteUserService } from '../../../domain/service/user/deleteUser/IDeleteUserService'
import { IAllocationService } from '../../allocation/AllocationServiceFactory'
import { IScheduleService } from '../../schedule/ScheduleServiceFactory'

export class DeleteUserService implements IDeleteUserService {
  constructor (private readonly _userRepository: IUserRepository,
    private readonly _allocationService: IAllocationService,
    private readonly _scheduleService: IScheduleService) {}

  async handler (id: number): Promise<IUser|Error> {
    if (!id) {
      throw new Error('No id provided')
    }

    const hasAllocations = await this._allocationService.getAllocationService.handler(id, EOptions.BY_USER) as IAllocation[]
    const hasAllocationsActive = hasAllocations.some(allocation => allocation.status === EStatus.active)

    if (hasAllocationsActive) {
      return new Error('Usuário possui alocação ativa.')
    }

    const hasSchedule = await this._scheduleService.getScheduleService.handler(id, EOptions.BY_USER) as ISchedule[]
    const hasSchedulesActive = hasSchedule.some(schedule => schedule.status === EStatus.active)

    if (hasSchedulesActive) {
      return new Error('Usuário possui agendamento ativo.')
    }

    const userDeleted = await this._userRepository.deleteUser(id)

    return userDeleted
  }
}
