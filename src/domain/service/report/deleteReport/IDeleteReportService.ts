import { IReport } from '../../../data/entity/IReport'

export interface IDeleteReportService {
  handler (id: number): Promise<IReport|Error>
}
