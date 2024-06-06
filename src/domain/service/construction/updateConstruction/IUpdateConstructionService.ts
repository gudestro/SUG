import { IConstruction } from '../../../data/entity/IConstruction'

export interface IUpdateConstructionService {
  handler (construction: IConstruction): Promise<IConstruction|Error>
}
