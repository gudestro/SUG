import { makeGetReportService } from './getReport/GetReportServiceFactory'
import { makeGetReportsService } from './getReports/GetReportsServiceFactory'
import { makeDeleteReportService } from './deleteReport/DeleteReportServiceFactory'
import { IGetReportService } from '../../domain/service/report/getReport/IGetReportService'
import { ISaveReportService } from '../../domain/service/report/saveReport/ISaveReportService'
import { IGetReportsService } from '../../domain/service/report/getReports/IGetReportsService'
import { IDeleteReportService } from '../../domain/service/report/deleteReport/IDeleteReportService'
import { IUpdateReportService } from '../../domain/service/report/updateReport/IUpdateReportService'
import { makeSaveReportService } from './saveReport/SaveReportServiceFactory'
import { makeUpdateReportService } from './ReportReport/UpdateReportServiceFactory'
import { makeReportValidation } from './ReportValidation'

export interface IReportService {
  getReportService: IGetReportService
  getReportsService: IGetReportsService
  saveReportService: ISaveReportService
  updateReportService: IUpdateReportService
  deleteReportService: IDeleteReportService
}

export const makeReportService = (): IReportService => {
  const validator = makeReportValidation()
  const getReportService = makeGetReportService().getReportService
  const saveReportService = makeSaveReportService(validator).saveReportService
  const updateReportService = makeUpdateReportService().updateReportService
  const deleteReportService = makeDeleteReportService().deleteReportService
  const getReportsService = makeGetReportsService().getReportsService

  return {
    getReportService,
    saveReportService,
    updateReportService,
    deleteReportService,
    getReportsService
  }
}
