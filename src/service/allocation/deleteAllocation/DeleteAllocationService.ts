import { IAllocation } from '../../../domain/data/entity/IAllocation'
import { ISchedule } from '../../../domain/data/entity/ISchedule'
import { IAllocationRepository } from '../../../domain/data/repository/allocation/IAllocationRepository'
import { IDeleteAllocationService } from '../../../domain/service/allocation/deleteAllocation/IDeleteAllocationService'
import { EOptions } from '../../../domain/service/allocation/getAllocation/IGetAllocationService'
import { IScheduleService } from '../../schedule/ScheduleServiceFactory'

export class DeleteAllocationService implements IDeleteAllocationService {
  constructor (private readonly _allocationRepository: IAllocationRepository,
    private readonly _scheduleService: IScheduleService) {}

  async handler (id: number): Promise<IAllocation|Error> {
    if (!id) {
      throw new Error('No id provided')
    }

    const schedules = await this._scheduleService.getScheduleService.handler(id, EOptions.BY_ALLOCATION) as ISchedule[]

    if (schedules?.length) {
      throw new Error('Você não pode excluir essa alocação pois existe agendamentos para ela.')
    }

    const allocationDeleted = await this._allocationRepository.deleteAllocation(id)

    return allocationDeleted
  }
}
