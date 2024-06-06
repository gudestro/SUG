import { IReport } from '../../../domain/data/entity/IReport'
import { Validation } from '../../../domain/utils/validator'
import { ISaveReportService } from '../../../domain/service/report/saveReport/ISaveReportService'
import { IReportRepository } from '../../../domain/data/repository/report/IReportRepository'
import { EStatus } from '../../../domain/data/entity/ISchedule'
import { ISchedulesRepository } from '../../../domain/data/repository/schedule/IScheduleRepository'
import { IUserRepository } from '../../../domain/data/repository/user/IUserRepository'
import { IConstructionRepository } from '../../../domain/data/repository/construction/IConstructionRepository'
import { EmailService } from '../../../utils/sendEmail'
import { IAllocationRepository } from '../../../domain/data/repository/allocation/IAllocationRepository'
import { PrismaNotificationRepository } from '../../../data/repository/notification/NotificationRepository'

export class SaveReportService implements ISaveReportService {
  constructor (
    private readonly _reportRepository: IReportRepository,
    private readonly _validator: Validation,
    private readonly _scheduleRepository: ISchedulesRepository,
    private readonly _allocationRepository: IAllocationRepository,
    private readonly _userRepository: IUserRepository,
    private readonly _constructionRepository: IConstructionRepository,
    private readonly _notificationRepository: PrismaNotificationRepository) {}

  async handler (report: Omit<IReport, 'id'>): Promise<IReport|Error> {
    // @ts-expect-error
    if (report.id) {
      return new Error('A report who already has an ID cannot be saved.')
    }

    const schedule = await this._scheduleRepository.getSchedule(report.scheduleId)

    if (!schedule) {
      report.constructionId = report.scheduleId
      report.scheduleId = null
    } else {
      report.constructionId = schedule.constructionId
    }

    report.createdAt = new Date()

    const hasIncorrectValue = await this._validator.validate(report)

    if (hasIncorrectValue) {
      return hasIncorrectValue
    }

    const result = await this._reportRepository.insertReport(report)

    if (!result) {
      return result
    }

    if (result.typeReport !== 'final') {
      schedule.status = EStatus.inactive
      schedule.updatedAt = new Date()

      await this._scheduleRepository.updateSchedule(schedule)
    }

    const construction = await this._constructionRepository.getConstruction('id', report.constructionId)
    const allocations = await this._allocationRepository.getAllocationByConstructionId(result.constructionId)

    if (result) {
      const user = await this._userRepository.getUser('id', result.userId)

      const message = `${result.createdAt?.toLocaleString('pt-Br').split(',')[0]}. E aqui está um comprovante dela: ${result.description}`

      void EmailService.sendEmail(
        user.email,
        user.name,
        construction.name,
        'uma entrega de relatório',
        message,
        'Você entregou um Relatório!',
        'Venha ver...'
      )

      if (user.office !== 'Engenheiro') {
        const allocationMap: any = await allocations.map(async (x) => {
          const user = await this._userRepository.getUser('id', result.userId)
          return {
            ...x,
            user: { ...user }
          }
        })

        const engineer = allocationMap.filter(x => x?.user?.office === 'Engenheiro')[0]
        await this._notificationRepository.insertNotification({
          createdAt: new Date(),
          userId: engineer.user.id,
          description: `O colaborador ${user.name} entregou o relatório da construção ${construction.name}`
        })
      }
    }

    if (result.typeReport === 'final') {
      for (const allocation of allocations) {
        await this._allocationRepository.updateAllocation({ ...allocation, updatedAt: new Date(), status: EStatus.inactive })
      }

      const schedules = await this._scheduleRepository.getScheduleByConstructionId(result.constructionId)

      for (const s of schedules) {
        if (s.status === EStatus.active) {
          await this._scheduleRepository.updateSchedule({ ...s, updatedAt: new Date(), status: EStatus.inactive })
        }
      }

      await this._constructionRepository.updateConstruction({
        ...construction,
        updatedAt: new Date(),
        status: EStatus.finished,
        finishedAt: new Date()
      })
    }

    return result
  }
}
