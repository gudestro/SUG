import express from 'express'
import { IRequest } from '../../common/IRequest'
import { isAdmin } from '../../middleware/IsAdmin'
import { IResponse } from '../../common/IResponse'
import { IController } from '../../common/IController'
import { requireLogin } from '../../middleware/RequireLogin'
import { IUserService } from '../../../service/user/UserServiceFactory'
import { SuccessResponse } from '../../common/responses/SuccessResponse'
import { InternalServerErrorResponse } from '../../common/responses/InternalServerErrorResponse'
import { BadRequestResponse } from '../../common/responses/BadRequestResponse'
import { getUserButtons } from '../../../utils/control-button'
import { IUser } from '../../../domain/data/entity/IUser'
import { GetNotificationService } from '../../../service/notification/getNotifications/GetReportsService'

export class UserController implements IController {
  public router = express.Router()

  constructor (private readonly _userService: IUserService,
    private readonly _notifications: GetNotificationService) {
    this.setupRoutes()
  }

  setupRoutes (): void {
    this.router.get('/usuarios', requireLogin, isAdmin, this.handler.bind(this))
    this.router.post('/user/getUser', requireLogin, isAdmin, this.getUser.bind(this))
    this.router.post('/user/saveUser', requireLogin, isAdmin, this.saveUser.bind(this))
    this.router.post('/user/updateUser', requireLogin, isAdmin, this.updateUser.bind(this))
    this.router.post('/user/deleteUser', requireLogin, isAdmin, this.deleteUser.bind(this))
  }

  async handler (req: IRequest, res: IResponse): Promise<any> {
    const email = req.user.email
    const user = await this._userService.getUserService.handler('email', email) as IUser
    const notificationsPopUp = await this._notifications.handler(user.id) || []
    const buttons = await getUserButtons(user)

    const users = await this._userService.getUsersService.handler()

    res.status(200).render('./user.pug', {
      user,
      ...buttons,
      users,
      hasFilterDate: false,
      hasFilterText: true,
      searchBy: 'nome do colaborador',
      notificationsPopUp
    })
  }

  async getUser (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const key = req.body.key
      const value = req.body.value

      if (!key || !value) {
        return BadRequestResponse.handler(res, 'No values provided.')
      }

      const user = await this._userService.getUserService.handler(key, value)

      return SuccessResponse.handler(res, JSON.stringify(user))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }

  async saveUser (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const userRaw = req.body

      if (!userRaw) {
        return BadRequestResponse.handler(res, 'No data provided.')
      }

      const user = await this._userService.saveUserService.handler(userRaw)

      return SuccessResponse.handler(res, JSON.stringify(user))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }

  async updateUser (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const userRaw = req.body

      if (!userRaw) {
        return BadRequestResponse.handler(res, 'No data provided.')
      }

      const user = await this._userService.updateUserService.handler(userRaw)

      return SuccessResponse.handler(res, JSON.stringify(user))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }

  async deleteUser (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const id = parseInt(req.body.id)

      if (!id) {
        return BadRequestResponse.handler(res, 'No id provided.')
      }

      const user = await this._userService.deleteUserService.handler(id)

      return SuccessResponse.handler(res, JSON.stringify(user))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }
}
