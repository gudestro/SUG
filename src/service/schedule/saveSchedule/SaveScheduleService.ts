import { Validation } from '../../../domain/utils/validator'
import { EStatus, ISchedule } from '../../../domain/data/entity/ISchedule'
import { ISchedulesRepository } from '../../../domain/data/repository/schedule/IScheduleRepository'
import { ISaveScheduleService } from '../../../domain/service/schedule/saveSchedule/ISaveScheduleService'
import { EmailService } from '../../../utils/sendEmail'
import { IUserRepository } from '../../../domain/data/repository/user/IUserRepository'
import { IConstructionRepository } from '../../../domain/data/repository/construction/IConstructionRepository'
import { PrismaNotificationRepository } from '../../../data/repository/notification/NotificationRepository'

export class SaveScheduleService implements ISaveScheduleService {
  constructor (
    private readonly _scheduleRepository: ISchedulesRepository,
    private readonly _validator: Validation,
    private readonly _userService: IUserRepository,
    private readonly _constructionRepository: IConstructionRepository,
    private readonly _notificationRepository: PrismaNotificationRepository) {}

  async handler (schedule: Omit<ISchedule, 'id'>): Promise<ISchedule|Error> {
    // @ts-expect-error
    if (schedule.id) {
      return new Error('A schedule who already has an ID cannot be saved.')
    }

    const hasIncorrectValue = await this._validator.validate(schedule)

    if (hasIncorrectValue) {
      return hasIncorrectValue
    }

    const hasSchedules = await this._scheduleRepository.getScheduleByUserId(schedule.userId)
    const hasSchedulesInSomeDate = hasSchedules.some(x =>
      new Date(x.dateSchedule).toLocaleString('pt-Br').split(',')[0] === new Date(schedule.dateSchedule).toLocaleString('pt-Br').split(',')[0] &&
      x.status === EStatus.active
    )

    if (hasSchedulesInSomeDate) {
      throw new Error('Usuário já existe um agendamento nessa data ativa.')
    }

    schedule.createdAt = new Date()

    const result = await this._scheduleRepository.insertSchedule(schedule)

    if (result) {
      const user = await this._userService.getUser('id', schedule.userId)
      const construction = await this._constructionRepository.getConstruction('id', schedule.constructionId)

      await EmailService.sendEmail(
        user.email,
        user.name,
        construction.name,
        'um agendamento',
        `${new Date(result.dateSchedule).toLocaleString('pt-Br').split(',')[0]}. \nObservação para o agendamento: ${result.description ?? 'Nenhuma'}`,
        'Você tem um novo agendamento!',
        'Venha ver...'
      )

      await this._notificationRepository.insertNotification({
        createdAt: new Date(),
        userId: user.id,
        description: `Você tem um agendamento para a construção ${construction.name} no dia ${new Date(result.dateSchedule).toLocaleString('pt-Br').split(',')[0]}`
      })
    }

    return result
  }
}
