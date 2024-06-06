import { ISchedule } from '../../../data/entity/ISchedule'

export interface IDeleteScheduleService {
  handler (id: number): Promise<ISchedule|Error>
}
