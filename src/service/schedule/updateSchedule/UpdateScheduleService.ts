import { Validation } from '../../../domain/utils/validator'
import { EStatus, ISchedule } from '../../../domain/data/entity/ISchedule'
import { IUpdateScheduleService } from '../../../domain/service/schedule/updateSchedule/IUpdateScheduleService'
import { ISchedulesRepository } from '../../../domain/data/repository/schedule/IScheduleRepository'
import { IUserRepository } from '../../../domain/data/repository/user/IUserRepository'
import { IConstructionRepository } from '../../../domain/data/repository/construction/IConstructionRepository'
import { EmailService } from '../../../utils/sendEmail'

export class UpdateScheduleService implements IUpdateScheduleService {
  constructor (
    private readonly _scheduleRepository: ISchedulesRepository,
    private readonly _validator: Validation,
    private readonly _userService: IUserRepository,
    private readonly _constructionRepository: IConstructionRepository) {}

  async handler (schedule: ISchedule): Promise<ISchedule|Error> {
    if (!schedule.id) {
      return new Error('A schedule who already no has an ID cannot be saved.')
    }

    const hasIncorrectValue = await this._validator.validate(schedule)

    if (hasIncorrectValue) {
      return hasIncorrectValue
    }

    const hasSchedules = await this._scheduleRepository.getScheduleByUserId(schedule.userId)
    const hasSchedulesInSomeDate = hasSchedules.some(x => x.id !== schedule.id && new Date(x.dateSchedule).getTime() === new Date(schedule.dateSchedule).getTime())

    if (hasSchedulesInSomeDate) {
      return new Error('User has schedule in some date.')
    }

    const result = await this._scheduleRepository.updateSchedule(schedule)

    if (result) {
      const user = await this._userService.getUser('id', schedule.userId)
      const construction = await this._constructionRepository.getConstruction('id', schedule.constructionId)

      const message = result.status === EStatus.inactive
        ? `${new Date(result.dateSchedule).toLocaleString('pt-Br').split(',')[0]}. E essa atualização é devido a conclusão dela.`
        : new Date(result.dateSchedule).toLocaleString('pt-Br').split(',')[0]

      await EmailService.sendEmail(
        user.email,
        user.name,
        construction.name,
        'uma atualização no seu agendamento',
        message,
        'Você teve uma atualização no seu agendamento',
        'Venha ver...'
      )
    }

    return result
  }
}
