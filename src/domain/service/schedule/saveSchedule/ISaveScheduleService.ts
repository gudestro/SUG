import { ISchedule } from '../../../data/entity/ISchedule'

export interface ISaveScheduleService {
  handler (schedule: Omit<ISchedule, 'id'>): Promise<ISchedule|Error>
}
