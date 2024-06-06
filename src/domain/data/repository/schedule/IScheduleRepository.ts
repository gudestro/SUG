import { ISchedule } from '../../entity/ISchedule'

export interface ISchedulesRepository {
  getSchedules(): Promise<ISchedule[] | null>
  deleteSchedule(schedulesId: number): Promise<ISchedule>
  getScheduleByUserId(userId: number): Promise<ISchedule[]>
  getSchedule(schedulesId: number): Promise<ISchedule | null>
  insertSchedule(schedulesData: Omit<ISchedule, 'id'>): Promise<ISchedule>
  updateSchedule(schedulesToUpdate: ISchedule): Promise<ISchedule>
  getScheduleByAllocationId(allocationId: number): Promise<ISchedule[]>
  getScheduleByConstructionId(constructionId: number): Promise<ISchedule[]>
}
