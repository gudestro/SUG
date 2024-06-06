import { ISchedule } from '../../../domain/data/entity/ISchedule'
import { ISchedulesRepository } from '../../../domain/data/repository/schedule/IScheduleRepository'
import { IGetSchedulesService } from '../../../domain/service/schedule/getSchedules/IGetSchedulesService'

export class GetSchedulesService implements IGetSchedulesService {
  constructor (private readonly _scheduleRepository: ISchedulesRepository) {}

  async handler (): Promise<ISchedule[]|Error> {
    const companies = await this._scheduleRepository.getSchedules()

    return companies
  }
}
