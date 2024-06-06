import express from 'express'
import { IRequest } from '../../common/IRequest'
import { IResponse } from '../../common/IResponse'
import { IController } from '../../common/IController'
import { requireLogin } from '../../middleware/RequireLogin'
import { IUserService } from '../../../service/user/UserServiceFactory'
import { getUserButtons } from '../../../utils/control-button'
import { IScheduleService } from '../../../service/schedule/ScheduleServiceFactory'
import { IUser } from '../../../domain/data/entity/IUser'
import { EStatus, ISchedule } from '../../../domain/data/entity/ISchedule'
import { IAllocationService } from '../../../service/allocation/AllocationServiceFactory'
import { IConstructionService } from '../../../service/construction/ConstructionServiceFactory'
import { IAllocation } from '../../../domain/data/entity/IAllocation'
import { IConstruction } from '../../../domain/data/entity/IConstruction'
import { GetNotificationService } from '../../../service/notification/getNotifications/GetReportsService'

export class HomeController implements IController {
  public router = express.Router()

  constructor (private readonly _userService: IUserService,
    private readonly _scheduleService: IScheduleService,
    private readonly _allocationService: IAllocationService,
    private readonly _constructionService: IConstructionService,
    private readonly _notifications: GetNotificationService) {
    this.setupRoutes()
  }

  setupRoutes (): void {
    this.router.get('/', requireLogin, this.handler.bind(this))
  }

  async handler (req: IRequest, res: IResponse): Promise<any> {
    const email = req.user.email
    const user = await this._userService.getUserService.handler('email', email) as IUser
    const notificationsPopUp = await this._notifications.handler(user.id) || []
    const schedulesRaw = await this._scheduleService.getSchedulesService.handler() as ISchedule[]
    const allocationsRaw = await this._allocationService.getAllocationsService.handler() as IAllocation[]
    const constructionsRaw = await this._constructionService.getConstructionsService.handler() as IConstruction[]
    const constructionsIncomplete = constructionsRaw.filter(x => x.status === EStatus.active).length
    const schedules = schedulesRaw.filter(x => x.userId === user.id && x.status === EStatus.active).map(x => {
      const c = constructionsRaw.filter(y => y.id === x.constructionId)[0]
      return {
        ...x,
        nameConstruction: c.name,
        infoConstruction: c.startDate
      }
    })

    const constructions = constructionsRaw.filter(x => x.status).map(y => {
      const allocationCount = allocationsRaw.filter(x => x.constructionId === y.id).length
      const allocationActiveCount = allocationsRaw.filter(x => x.constructionId === y.id && x.status === EStatus.active).length
      const schedulesCount = schedulesRaw.filter(x => x.constructionId === y.id).length
      const schedulesActiveCount = schedulesRaw.filter(x => x.constructionId === y.id && x.status === EStatus.active).length
      const schedulesNotActiveCount = schedulesRaw.filter(x => x.constructionId === y.id && x.status !== EStatus.active).length
      return {
        ...y,
        allocationCount,
        allocationActiveCount,
        schedulesCount,
        schedulesActiveCount,
        schedulesNotActiveCount
      }
    })

    const buttons = await getUserButtons(user)
    res.status(200).render('./home.pug', { user, ...buttons, schedules, constructionsIncomplete, constructions, notificationsPopUp })
  }
}
