import { ISchedule } from '../../../domain/data/entity/ISchedule'
import { ISchedulesRepository } from '../../../domain/data/repository/schedule/IScheduleRepository'
import { EOptions } from '../../../domain/service/allocation/getAllocation/IGetAllocationService'
import { IGetScheduleService } from '../../../domain/service/schedule/getSchedule/IGetScheduleService'

export class GetScheduleService implements IGetScheduleService {
  constructor (private readonly _scheduleRepository: ISchedulesRepository) {}

  async handler (id: number, option: EOptions): Promise<ISchedule[]|Error> {
    if (!id) {
      return new Error('No id provided')
    }

    let schedule = null

    if (option === EOptions.BY_USER) {
      schedule = await this._scheduleRepository.getScheduleByUserId(id)
    }

    if (option === EOptions.BY_ALLOCATION) {
      schedule = await this._scheduleRepository.getScheduleByAllocationId(id)
    }

    if (option === EOptions.BY_CONSTRUCTION) {
      schedule = await this._scheduleRepository.getScheduleByConstructionId(id)
    }

    if (option === EOptions.BY_SCHEDULE) {
      schedule = [await this._scheduleRepository.getSchedule(id)]
    }

    return schedule
  }
}
