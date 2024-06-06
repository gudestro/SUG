import { IConstruction } from '../../../data/entity/IConstruction'

export interface ISaveConstructionService {
  handler (construction: Omit<IConstruction, 'id'>): Promise<IConstruction|Error>
}
