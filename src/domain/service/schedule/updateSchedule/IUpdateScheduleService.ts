import { ISchedule } from '../../../data/entity/ISchedule'

export interface IUpdateScheduleService {
  handler (schedule: ISchedule): Promise<ISchedule|Error>
}
