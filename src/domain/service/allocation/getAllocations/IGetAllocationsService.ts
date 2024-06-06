import { IAllocation } from '../../../data/entity/IAllocation'

export interface IGetAllocationsService {
  handler (): Promise<IAllocation[]|Error>
}
