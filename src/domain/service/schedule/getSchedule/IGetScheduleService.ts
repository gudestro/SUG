import { ISchedule } from '../../../data/entity/ISchedule'
import { EOptions } from '../../allocation/getAllocation/IGetAllocationService'

export interface IGetScheduleService {
  handler (id: number, option: EOptions): Promise<ISchedule[]|Error>
}
