import { PrismaClient } from '@prisma/client'

export class PrismaNotificationRepository {
  constructor (readonly _prismaClient: PrismaClient) {}

  private map (object: any): any {
    const notification = {
      id: object.id,
      createdAt: new Date(object.createdAt),
      description: object.description,
      userId: object.userId
    }

    return notification
  }

  async insertNotification (notificationData: any): Promise<any> {
    const notification = await this._prismaClient.notification.create({
      data: notificationData
    })

    return notification
  }

  async updateNotification (notificationToUpdate: any): Promise<any> {
    const { id, ...data } = notificationToUpdate

    const notification = await this._prismaClient.notification.update({
      data,
      where: { id }
    })

    return notification
  }

  async getNotification (notificationId: number): Promise<any | null> {
    const r = this._prismaClient.notification.findUnique({
      where: { id: notificationId }
    })

    return this.map(r)
  }

  async getNotifications (): Promise<any[] | null> {
    const r = await this._prismaClient.notification.findMany({
      orderBy: [
        {
          id: 'asc'
        }
      ]
    })

    return r.map(notification => this.map(notification))
  }

  async getNotificationByUserId (userId: number): Promise<any[]> {
    const r = await this._prismaClient.notification.findMany({
      where: { userId }
    })
    return r.map(notification => this.map(notification))
  }
}
