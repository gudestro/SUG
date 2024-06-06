import express from 'express'
import { IRequest } from '../../common/IRequest'
import { isAdmin } from '../../middleware/IsAdmin'
import { IResponse } from '../../common/IResponse'
import { IController } from '../../common/IController'
import { requireLogin } from '../../middleware/RequireLogin'
import { SuccessResponse } from '../../common/responses/SuccessResponse'
import { BadRequestResponse } from '../../common/responses/BadRequestResponse'
import { IConstructionService } from '../../../service/construction/ConstructionServiceFactory'
import { InternalServerErrorResponse } from '../../common/responses/InternalServerErrorResponse'
import { ICompanyService } from '../../../service/company/CompanyServiceFactory'
import { ICompany } from '../../../domain/data/entity/ICompany'
import { IConstruction } from '../../../domain/data/entity/IConstruction'
import { IUserService } from '../../../service/user/UserServiceFactory'
import { getUserButtons } from '../../../utils/control-button'
import { GetNotificationService } from '../../../service/notification/getNotifications/GetReportsService'
import { IUser } from '../../../domain/data/entity/IUser'
import { IAllocationService } from '../../../service/allocation/AllocationServiceFactory'
import { IAllocation } from '../../../domain/data/entity/IAllocation'
import { IReportService } from '../../../service/report/ReportServiceFactory'
import { EOptions } from '../../../domain/service/allocation/getAllocation/IGetAllocationService'
import { IReport } from '../../../domain/data/entity/IReport'

export class ConstructionController implements IController {
  public router = express.Router()

  constructor (private readonly _constructionService: IConstructionService,
    private readonly _companyService: ICompanyService,
    private readonly _userService: IUserService,
    private readonly _notifications: GetNotificationService,
    private readonly _allocationService: IAllocationService,
    private readonly _reportService: IReportService) {
    this.setupRoutes()
  }

  setupRoutes (): void {
    this.router.get('/construcao', requireLogin, this.handler.bind(this))
    this.router.get('/construcoes/:id', requireLogin, this.handlerConstruction.bind(this))
    this.router.post('/construction/getConstruction', requireLogin, isAdmin, this.getConstruction.bind(this))
    this.router.post('/construction/getConstructions', requireLogin, isAdmin, this.getConstructions.bind(this))
    this.router.post('/construction/saveConstruction', requireLogin, isAdmin, this.saveConstruction.bind(this))
    this.router.post('/construction/updateConstruction', requireLogin, isAdmin, this.updateConstruction.bind(this))
    this.router.post('/construction/deleteConstruction', requireLogin, isAdmin, this.deleteConstruction.bind(this))
  }

  async handler (request: IRequest, response: IResponse): Promise<any> {
    const email = request.user.email
    const user = await this._userService.getUserService.handler('email', email) as IUser
    const notificationsPopUp = await this._notifications.handler(user.id) || []
    const buttons = await getUserButtons(user)
    const constructionsRaw = await this._constructionService.getConstructionsService.handler() as IConstruction[]
    const companies = await this._companyService.getCompaniesService.handler() as ICompany[]
    const constructions = constructionsRaw.map(c => {
      const company = companies.filter(company => company.id === c.companyId)[0]
      return {
        ...c,
        company: {
          name: company?.nameCompany
        }
      }
    })
    response.status(200).render('./construction.pug', {
      user,
      canEdit: true,
      ...buttons,
      constructions,
      companies,
      hasFilterDate: false,
      hasFilterText: true,
      searchBy: 'nome da obra ou da companhia',
      notificationsPopUp
    })
  }

  async handlerViewConstructions (request: IRequest, response: IResponse): Promise<any> {
    const email = request.user.email
    const user = await this._userService.getUserService.handler('email', email) as IUser
    const notificationsPopUp = await this._notifications.handler(user.id) || []
    const buttons = await getUserButtons(user)
    const constructionsRaw = await this._constructionService.getConstructionsService.handler() as IConstruction[]
    const companies = await this._companyService.getCompaniesService.handler() as ICompany[]
    const constructions = constructionsRaw.map(c => {
      const company = companies.filter(company => company.id === c.companyId)[0]
      return {
        ...c,
        company: {
          name: company?.nameCompany
        }
      }
    })
    response.status(200).render('./construction.pug', {
      user,
      canEdit: false,
      ...buttons,
      constructions,
      companies,
      hasFilterDate: false,
      hasFilterText: true,
      searchBy: 'nome da obra ou da companhia',
      notificationsPopUp
    })
  }

  async handlerConstruction (request: IRequest, response: IResponse): Promise<any> {
    const id = request.params.id

    if (!id) {
      return
    }

    const email = request.user.email
    const user = await this._userService.getUserService.handler('email', email) as IUser
    const notificationsPopUp = await this._notifications.handler(user.id) || []
    const buttons = await getUserButtons(user)

    const constructionsRaw = await this._constructionService.getConstructionsService.handler() as IConstruction[]
    const allocationsRaw = await this._allocationService.getAllocationsService.handler() as IAllocation[]
    const usersRaw = await this._userService.getUsersService.handler() as IUser[]
    const reportsRaw = await this._reportService.getReportService.handler(parseInt(id), EOptions.BY_CONSTRUCTION) as IReport[]

    const reports = reportsRaw.map(x => {
      const user = usersRaw.filter(u => u.id === x.userId)[0]
      return {
        ...x,
        user: {
          name: user.name,
          office: user.office
        }
      }
    })

    const companies = await this._companyService.getCompaniesService.handler() as ICompany[]

    const constructions = constructionsRaw.filter(x => x.id === parseInt(id)).map(c => {
      const allocations = allocationsRaw.filter(y => y.constructionId === c.id).map(a => {
        const user = usersRaw.filter(u => u.id === a.userId)[0]
        return {
          ...a,
          user: {
            name: user.name,
            office: user.office
          }
        }
      })

      const engineer = allocations.filter(a => a.user.office === 'Engenheiro')[0]

      const company = companies.filter(company => company.id === c.companyId)[0]
      return {
        ...c,
        company: {
          name: company?.nameCompany
        },
        allocations,
        engineer: engineer?.user,
        reports
      }
    })
    response.status(200).render('./construction-complete.pug', {
      user,
      canEdit: false,
      ...buttons,
      construction: constructions[0],
      companies,
      hasFilterDate: false,
      hasFilterText: false,
      searchBy: '',
      notificationsPopUp
    })
  }

  async getConstruction (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const id = parseInt(req.body.id)

      if (!id) {
        return BadRequestResponse.handler(res, 'No values provided.')
      }

      const construction = await this._constructionService.getConstructionService.handler('id', id)

      return SuccessResponse.handler(res, JSON.stringify(construction))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }

  async getConstructions (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const construction = await this._constructionService.getConstructionsService.handler()

      return SuccessResponse.handler(res, JSON.stringify(construction))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }

  async saveConstruction (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const constructionRaw = req.body

      if (!constructionRaw) {
        return BadRequestResponse.handler(res, 'No data provided.')
      }

      const construction = await this._constructionService.saveConstructionService.handler(constructionRaw)

      return SuccessResponse.handler(res, JSON.stringify(construction))
    } catch (error) {
      console.error(error)
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }

  async updateConstruction (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const constructionRaw = req.body

      if (!constructionRaw) {
        return BadRequestResponse.handler(res, 'No data provided.')
      }

      const construction = await this._constructionService.updateConstructionService.handler(constructionRaw)

      return SuccessResponse.handler(res, JSON.stringify(construction))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }

  async deleteConstruction (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const id = parseInt(req.body.id)

      if (!id) {
        return BadRequestResponse.handler(res, 'No id provided.')
      }

      const construction = await this._constructionService.deleteConstructionService.handler(id)

      return SuccessResponse.handler(res, JSON.stringify(construction))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }
}
