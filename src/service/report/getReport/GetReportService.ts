import { IReport } from '../../../domain/data/entity/IReport'
import { IReportRepository } from '../../../domain/data/repository/report/IReportRepository'
import { EOptions } from '../../../domain/service/allocation/getAllocation/IGetAllocationService'
import { IGetReportService } from '../../../domain/service/report/getReport/IGetReportService'

export class GetReportService implements IGetReportService {
  constructor (private readonly _reportRepository: IReportRepository) {}

  async handler (id: any, option: EOptions): Promise<IReport[]|Error> {
    if (!id) {
      return new Error('No id provided')
    }

    let report = null

    if (option === EOptions.BY_USER) {
      report = await this._reportRepository.getReportByUserId(id)
    }

    if (option === EOptions.BY_SCHEDULE) {
      report = await this._reportRepository.getReportBySchedulesId(id)
    }

    if (option === EOptions.BY_CONSTRUCTION) {
      report = await this._reportRepository.getReportByConstructionId(id)
    }

    if (option === EOptions.BY_REPORT) {
      report = await this._reportRepository.getReport(id)
    }

    return report
  }
}
