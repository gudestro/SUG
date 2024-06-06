import { IConstruction } from '../../../data/entity/IConstruction'

export interface IGetConstructionService {
  handler (key: string, value: any): Promise<IConstruction|Error>
}
