import { IAllocation } from '../../../data/entity/IAllocation'

export interface IUpdateAllocationService {
  handler (allocation: IAllocation): Promise<IAllocation|Error>
}
