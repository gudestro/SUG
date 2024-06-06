import { IAllocation } from '../../../data/entity/IAllocation'

export interface IDeleteAllocationService {
  handler (id: number): Promise<IAllocation|Error>
}
