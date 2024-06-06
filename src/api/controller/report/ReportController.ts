import express from 'express'
import { IRequest } from '../../common/IRequest'
import { isAdmin } from '../../middleware/IsAdmin'
import { IResponse } from '../../common/IResponse'
import { IController } from '../../common/IController'
import { requireLogin } from '../../middleware/RequireLogin'
import { SuccessResponse } from '../../common/responses/SuccessResponse'
import { BadRequestResponse } from '../../common/responses/BadRequestResponse'
import { IReportService } from '../../../service/report/ReportServiceFactory'
import { InternalServerErrorResponse } from '../../common/responses/InternalServerErrorResponse'
import { IUserService } from '../../../service/user/UserServiceFactory'
import { IScheduleService } from '../../../service/schedule/ScheduleServiceFactory'
import { getUserButtons } from '../../../utils/control-button'
import { EStatus, ISchedule } from '../../../domain/data/entity/ISchedule'
import { IUser } from '../../../domain/data/entity/IUser'
import { IConstructionService } from '../../../service/construction/ConstructionServiceFactory'
import { IAllocationService } from '../../../service/allocation/AllocationServiceFactory'
import { IConstruction } from '../../../domain/data/entity/IConstruction'
import { IAllocation } from '../../../domain/data/entity/IAllocation'
import { IReport } from '../../../domain/data/entity/IReport'
import { GetNotificationService } from '../../../service/notification/getNotifications/GetReportsService'

export class ReportController implements IController {
  public router = express.Router()

  constructor (private readonly _reportService: IReportService,
    private readonly _userService: IUserService,
    private readonly _scheduleService: IScheduleService,
    private readonly _constructionService: IConstructionService,
    private readonly _allocationService: IAllocationService,
    private readonly _notifications: GetNotificationService) {
    this.setupRoutes()
  }

  setupRoutes (): void {
    this.router.get('/relatorio', requireLogin, this.handler.bind(this))
    this.router.get('/entregar-relatorio', requireLogin, this.sendMyReport.bind(this))
    this.router.get('/entregar-relatorio-final', requireLogin, this.sendMyReportFinal.bind(this))
    this.router.get('/meus-relatorios', requireLogin, this.viewMyReports.bind(this))
    this.router.get('/relatorios', requireLogin, this.viewAllReports.bind(this))
    this.router.get('/relatorios/:id', requireLogin, this.viewReports.bind(this))
    this.router.post('/report/getReport', requireLogin, this.getReport.bind(this))
    this.router.post('/report/getReports', requireLogin, this.getReports.bind(this))
    this.router.post('/report/saveReport', requireLogin, this.saveReport.bind(this))
    this.router.post('/report/updateReport', requireLogin, isAdmin, this.updateReport.bind(this))
    this.router.post('/report/deleteReport', requireLogin, isAdmin, this.deleteReport.bind(this))
    this.router.post('/report/validateReport', requireLogin, isAdmin, this.validateReport.bind(this))
  }

  async handler (request: IRequest, response: IResponse): Promise<any> {
    const email = request.user.email
    const user = await this._userService.getUserService.handler('email', email) as IUser
    const notificationsPopUp = await this._notifications.handler(user.id) || []
    const buttons = await getUserButtons(user)
    const reportsRaw = await this._reportService.getReportsService.handler() as IReport[]

    const schedules = await this._scheduleService.getSchedulesService.handler() as ISchedule[]

    const users = await this._userService.getUsersService.handler() as IUser[]

    const constructions = await this._constructionService.getConstructionsService.handler() as IConstruction[]

    const allocations = await this._allocationService.getAllocationsService.handler() as IAllocation[]

    const reports = reportsRaw.map(x => {
      const user = users.filter(u => u.id === x.userId)[0]
      const construction = constructions.filter(c => c.id === x.constructionId)[0]
      const schedule = schedules.filter(c => c.id === x.scheduleId)[0]
      return {
        ...x,
        user: {
          name: user.name,
          office: user.office
        },
        construction: {
          name: construction.name
        },
        schedule: {
          dateSchedule: schedule?.dateSchedule
        }
      }
    })
    const canAddReport = schedules.some(s => s.userId === user.id && s.status === EStatus.active)
    response.status(200).render('./report.pug', {
      user,
      ...buttons,
      canAddReport,
      constructions,
      allocations,
      reports,
      canPrint: false,
      canEdit: true,
      hasFilterDate: true,
      hasFilterText: true,
      searchBy: 'nome do colaborador ou cargo',
      notificationsPopUp
    })
  }

  async viewMyReports (request: IRequest, response: IResponse): Promise<any> {
    const email = request.user.email
    const user = await this._userService.getUserService.handler('email', email) as IUser
    const notificationsPopUp = await this._notifications.handler(user.id) || []
    const buttons = await getUserButtons(user)
    const reportsRaw = await this._reportService.getReportsService.handler() as IReport[]

    const schedules = await this._scheduleService.getSchedulesService.handler() as ISchedule[]

    const users = await this._userService.getUsersService.handler() as IUser[]

    const constructions = await this._constructionService.getConstructionsService.handler() as IConstruction[]

    const allocations = await this._allocationService.getAllocationsService.handler() as IAllocation[]

    const reports = reportsRaw.filter(x => x.userId === user.id).map(x => {
      const user = users.filter(u => u.id === x.userId)[0]
      const construction = constructions.filter(c => c.id === x.constructionId)[0]
      const schedule = schedules.filter(c => c.id === x.scheduleId)[0]
      return {
        ...x,
        user: {
          name: user.name,
          office: user.office
        },
        construction: {
          name: construction.name
        },
        schedule: {
          dateSchedule: schedule?.dateSchedule
        }
      }
    })
    const canAddReport = schedules.some(s => s.userId === user.id && s.status === EStatus.active)
    response.status(200).render('./report.pug', {
      user,
      ...buttons,
      canAddReport,
      constructions,
      allocations,
      reports,
      canPrint: true,
      canEdit: true,
      hasFilterText: true,
      searchBy: 'nome do colaborador ou cargo',
      hasFilterDate: true,
      notificationsPopUp
    })
  }

  async viewAllReports (request: IRequest, response: IResponse): Promise<any> {
    const email = request.user.email
    const user = await this._userService.getUserService.handler('email', email) as IUser
    const notificationsPopUp = await this._notifications.handler(user.id) || []
    const buttons = await getUserButtons(user)
    const reportsRaw = await this._reportService.getReportsService.handler() as IReport[]

    const schedules = await this._scheduleService.getSchedulesService.handler() as ISchedule[]

    const users = await this._userService.getUsersService.handler() as IUser[]

    const constructions = await this._constructionService.getConstructionsService.handler() as IConstruction[]

    const allocations = await this._allocationService.getAllocationsService.handler() as IAllocation[]

    const reports = reportsRaw.map(x => {
      const user = users.filter(u => u.id === x.userId)[0]
      const construction = constructions.filter(c => c.id === x.constructionId)[0]
      const schedule = schedules.filter(c => c.id === x.scheduleId)[0]
      return {
        ...x,
        user: {
          name: user.name,
          office: user.office
        },
        construction: {
          name: construction.name
        },
        schedule: {
          dateSchedule: schedule?.dateSchedule
        }
      }
    })
    const canAddReport = schedules.some(s => s.userId === user.id && s.status === EStatus.active)
    response.status(200).render('./report.pug', {
      user,
      ...buttons,
      canAddReport,
      constructions,
      allocations,
      reports,
      canPrint: true,
      canEdit: true,
      hasFilterText: true,
      searchBy: 'nome do colaborador ou cargo',
      hasFilterDate: true,
      notificationsPopUp
    })
  }

  async viewReports (request: IRequest, response: IResponse): Promise<any> {
    const id = request.params.id

    if (!id) {
      return
    }

    const email = request.user.email
    const user = await this._userService.getUserService.handler('email', email) as IUser
    const notificationsPopUp = await this._notifications.handler(user.id) || []
    const buttons = await getUserButtons(user)
    const reportsRaw = await this._reportService.getReportsService.handler() as IReport[]

    const schedules = await this._scheduleService.getSchedulesService.handler() as ISchedule[]

    const users = await this._userService.getUsersService.handler() as IUser[]

    const constructions = await this._constructionService.getConstructionsService.handler() as IConstruction[]

    const reports = reportsRaw.filter(x => x.id === parseInt(id)).map(x => {
      const user = users.filter(u => u.id === x.userId)[0]
      const construction = constructions.filter(c => c.id === x.constructionId)[0]
      const schedule = schedules.filter(c => c.id === x.scheduleId)[0]
      return {
        ...x,
        user: {
          name: user.name,
          office: user.office
        },
        construction: {
          name: construction.name
        },
        schedule: {
          dateSchedule: schedule?.dateSchedule
        }
      }
    })
    const canAddReport = schedules.some(s => s.userId === user.id && s.status === EStatus.active)
    response.status(200).render('./report-complete.pug', {
      user,
      ...buttons,
      canAddReport,
      canPrint: true,
      report: reports[0],
      canEdit: true,
      hasFilterText: false,
      searchBy: '',
      hasFilterDate: false,
      notificationsPopUp
    })
  }

  async sendMyReport (request: IRequest, response: IResponse): Promise<any> {
    const email = request.user.email
    const user = await this._userService.getUserService.handler('email', email) as IUser
    const notificationsPopUp = await this._notifications.handler(user.id) || []
    const buttons = await getUserButtons(user)

    const schedulesRaw = await this._scheduleService.getSchedulesService.handler() as ISchedule[]

    const schedulesActive = schedulesRaw.filter(x => x.userId === user.id && x.status === EStatus.active)

    const constructions = await this._constructionService.getConstructionsService.handler() as IConstruction[]

    const schedules = schedulesActive.map(s => {
      const construction = constructions.filter(c => c.id === s.constructionId)[0]

      return {
        ...s,
        nameButton: `${s.dateSchedule.toISOString().split('T')[0]} - ${construction.name}`
      }
    }).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())

    const canAddReport = schedules.some(s => s.userId === user.id && s.status === EStatus.active)
    response.status(200).render('./my-report.pug', { user, ...buttons, canAddReport, constructions, schedules, notificationsPopUp })
  }

  async sendMyReportFinal (request: IRequest, response: IResponse): Promise<any> {
    const email = request.user.email
    const user = await this._userService.getUserService.handler('email', email) as IUser
    const notificationsPopUp = await this._notifications.handler(user.id) || []
    const buttons = await getUserButtons(user)

    const allocationRaw = await this._allocationService.getAllocationsService.handler() as ISchedule[]

    const allocationActive = allocationRaw.filter(x => x.userId === user.id && x.status === EStatus.active)

    const constructions = await this._constructionService.getConstructionsService.handler() as IConstruction[]

    const allocation = allocationActive.map(s => {
      const construction = constructions.filter(c => c.id === s.constructionId)[0]

      return {
        ...s,
        idConstruction: construction.id,
        nameButton: construction.name
      }
    }).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())

    const canAddReport = allocation.some(s => s.userId === user.id && s.status === EStatus.active)
    response.status(200).render('./my-report-final.pug', { user, ...buttons, canAddReport, constructions, allocation, notificationsPopUp })
  }

  async getReport (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const id = parseInt(req.body.id)
      const option = req.body.option

      if (!id) {
        return BadRequestResponse.handler(res, 'No values provided.')
      }

      const report = await this._reportService.getReportService.handler(id, option)

      return SuccessResponse.handler(res, JSON.stringify(report))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }

  async getReports (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const report = await this._reportService.getReportsService.handler()

      return SuccessResponse.handler(res, JSON.stringify(report))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }

  async saveReport (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const reportRaw = req.body

      if (!reportRaw) {
        return BadRequestResponse.handler(res, 'No data provided.')
      }

      let report = await this._reportService.saveReportService.handler(reportRaw)

      if (report instanceof Error) {
        report = { message: report.message } as any
      }

      return SuccessResponse.handler(res, JSON.stringify(report))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }

  async updateReport (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const reportRaw = req.body

      if (!reportRaw) {
        return BadRequestResponse.handler(res, 'No data provided.')
      }

      const report = await this._reportService.updateReportService.handler(reportRaw)

      return SuccessResponse.handler(res, JSON.stringify(report))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }

  async deleteReport (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const id = parseInt(req.body.id)

      if (!id) {
        return BadRequestResponse.handler(res, 'No id provided.')
      }

      const report = await this._reportService.deleteReportService.handler(id)

      return SuccessResponse.handler(res, JSON.stringify(report))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }

  async validateReport (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const id = parseInt(req.body.id)

      if (!id) {
        return BadRequestResponse.handler(res, 'No id provided.')
      }

      const report = await this._reportService.updateReportService.handler({ id: id, isValided: true })

      return SuccessResponse.handler(res, JSON.stringify(report))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }
}
