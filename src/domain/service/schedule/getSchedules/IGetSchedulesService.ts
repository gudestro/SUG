import { ISchedule } from '../../../data/entity/ISchedule'

export interface IGetSchedulesService {
  handler (): Promise<ISchedule[]|Error>
}
