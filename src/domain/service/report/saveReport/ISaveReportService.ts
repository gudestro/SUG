import { IReport } from '../../../data/entity/IReport'

export interface ISaveReportService {
  handler (report: Omit<IReport, 'id'>): Promise<IReport|Error>
}
