import { IAllocation } from '../../../data/entity/IAllocation'

export enum EOptions {
  BY_USER = 1,
  BY_REPORT = 2,
  BY_SCHEDULE = 3,
  BY_ALLOCATION = 4,
  BY_CONSTRUCTION = 5,
}

export interface IGetAllocationService {
  handler (id: number, option: EOptions): Promise<IAllocation[]|Error>
}
