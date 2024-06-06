import { IReport } from '../../../data/entity/IReport'

export interface IUpdateReportService {
  handler (report: any): Promise<IReport|Error>
}
