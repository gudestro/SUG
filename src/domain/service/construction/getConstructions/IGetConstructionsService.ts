import { IConstruction } from '../../../data/entity/IConstruction'

export interface IGetConstructionsService {
  handler (): Promise<IConstruction[]|Error>
}
