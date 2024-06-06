import { Validation } from '../../../domain/utils/validator'
import { IReport } from '../../../domain/data/entity/IReport'
import { IUpdateReportService } from '../../../domain/service/report/updateReport/IUpdateReportService'
import { IReportRepository } from '../../../domain/data/repository/report/IReportRepository'

export class UpdateReportService implements IUpdateReportService {
  constructor (
    private readonly _reportRepository: IReportRepository,
    private readonly _validator: Validation) {}

  async handler (report: any): Promise<IReport|Error> {
    if (!report.id) {
      return new Error('A report who already no has an ID cannot be saved.')
    }

    const result = this._reportRepository.updateReport(report)

    return result
  }
}
