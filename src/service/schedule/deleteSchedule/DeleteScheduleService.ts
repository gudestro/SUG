import { IReport } from '../../../domain/data/entity/IReport'
import { ISchedule } from '../../../domain/data/entity/ISchedule'
import { ISchedulesRepository } from '../../../domain/data/repository/schedule/IScheduleRepository'
import { EOptions } from '../../../domain/service/allocation/getAllocation/IGetAllocationService'
import { IDeleteScheduleService } from '../../../domain/service/schedule/deleteSchedule/IDeleteScheduleService'
import { IReportService } from '../../report/ReportServiceFactory'

export class DeleteScheduleService implements IDeleteScheduleService {
  constructor (private readonly _scheduleRepository: ISchedulesRepository,
    private readonly _reportService: IReportService) {}

  async handler (id: number): Promise<ISchedule|Error> {
    if (!id) {
      throw new Error('No id provided')
    }

    const reports = await this._reportService.getReportService.handler(id, EOptions.BY_SCHEDULE) as IReport[]

    if (reports?.length) {
      throw new Error('Você não pode excluir esse agendamento pois existe relatório para ele.')
    }

    const scheduleDeleted = await this._scheduleRepository.deleteSchedule(id)

    return scheduleDeleted
  }
}
