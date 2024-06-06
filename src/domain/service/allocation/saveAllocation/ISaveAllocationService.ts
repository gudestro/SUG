import { IAllocation } from '../../../data/entity/IAllocation'

export interface ISaveAllocationService {
  handler (allocation: Omit<IAllocation, 'id'>): Promise<IAllocation|Error>
}
