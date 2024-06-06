import { IConstruction } from '../../../data/entity/IConstruction'

export interface IDeleteConstructionService {
  handler (id: number): Promise<IConstruction|Error>
}
