import { IReport } from '../../../domain/data/entity/IReport'
import { IReportRepository } from '../../../domain/data/repository/report/IReportRepository'
import { IDeleteReportService } from '../../../domain/service/report/deleteReport/IDeleteReportService'

export class DeleteReportService implements IDeleteReportService {
  constructor (private readonly _reportRepository: IReportRepository) {}

  async handler (id: number): Promise<IReport|Error> {
    if (!id) {
      throw new Error('No id provided')
    }

    const reportDeleted = await this._reportRepository.deleteReport(id)

    return reportDeleted
  }
}
