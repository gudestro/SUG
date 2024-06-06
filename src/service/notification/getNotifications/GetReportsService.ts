import { PrismaNotificationRepository } from '../../../data/repository/notification/NotificationRepository'

export class GetNotificationService {
  constructor (private readonly _notificationRepository: PrismaNotificationRepository) {}

  async handler (id): Promise<any[]|Error> {
    const companies = await this._notificationRepository.getNotificationByUserId(id)

    return companies
  }
}
