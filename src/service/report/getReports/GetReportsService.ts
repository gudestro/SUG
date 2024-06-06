import { IReport } from '../../../domain/data/entity/IReport'
import { IReportRepository } from '../../../domain/data/repository/report/IReportRepository'
import { IGetReportsService } from '../../../domain/service/report/getReports/IGetReportsService'

export class GetReportsService implements IGetReportsService {
  constructor (private readonly _reportRepository: IReportRepository) {}

  async handler (): Promise<IReport[]|Error> {
    const companies = await this._reportRepository.getReports()

    return companies
  }
}
