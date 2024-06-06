import { IReport } from '../../../data/entity/IReport'

export interface IGetReportsService {
  handler (): Promise<IReport[]|Error>
}
