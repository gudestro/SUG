import express from 'express'
import { IRequest } from '../../common/IRequest'
import { isAdmin } from '../../middleware/IsAdmin'
import { IResponse } from '../../common/IResponse'
import { IController } from '../../common/IController'
import { requireLogin } from '../../middleware/RequireLogin'
import { SuccessResponse } from '../../common/responses/SuccessResponse'
import { BadRequestResponse } from '../../common/responses/BadRequestResponse'
import { ICompanyService } from '../../../service/company/CompanyServiceFactory'
import { InternalServerErrorResponse } from '../../common/responses/InternalServerErrorResponse'
import { IUserService } from '../../../service/user/UserServiceFactory'
import { getUserButtons } from '../../../utils/control-button'
import { GetNotificationService } from '../../../service/notification/getNotifications/GetReportsService'
import { IUser } from '../../../domain/data/entity/IUser'

export class CompanyController implements IController {
  public router = express.Router()

  constructor (private readonly _companyService: ICompanyService,
    private readonly _userService: IUserService,
    private readonly _notifications: GetNotificationService) {
    this.setupRoutes()
  }

  setupRoutes (): void {
    this.router.get('/companhia', requireLogin, isAdmin, this.handler.bind(this))
    this.router.post('/company/getCompany', requireLogin, this.getCompany.bind(this))
    this.router.post('/company/getCompanies', requireLogin, this.getCompanies.bind(this))
    this.router.post('/company/saveCompany', requireLogin, isAdmin, this.saveCompany.bind(this))
    this.router.post('/company/updateCompany', requireLogin, isAdmin, this.updateCompany.bind(this))
    this.router.post('/company/deleteCompany', requireLogin, isAdmin, this.deleteCompany.bind(this))
  }

  async handler (request: IRequest, response: IResponse): Promise<any> {
    const email = request.user.email
    const user = await this._userService.getUserService.handler('email', email) as IUser
    const notificationsPopUp = await this._notifications.handler(user.id) || []
    const buttons = await getUserButtons(user)
    const companies = await this._companyService.getCompaniesService.handler()
    response.status(200).render('./company.pug', {
      user,
      ...buttons,
      companies,
      hasFilterDate: false,
      hasFilterText: true,
      searchBy: 'nome da companhia',
      notificationsPopUp
    })
  }

  async getCompany (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const id = parseInt(req.body.id)

      if (!id) {
        return BadRequestResponse.handler(res, 'No values provided.')
      }

      const company = await this._companyService.getCompanyService.handler(id)

      return SuccessResponse.handler(res, JSON.stringify(company))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }

  async getCompanies (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const company = await this._companyService.getCompaniesService.handler()

      return SuccessResponse.handler(res, JSON.stringify(company))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }

  async saveCompany (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const companyRaw = req.body

      if (!companyRaw) {
        return BadRequestResponse.handler(res, 'No data provided.')
      }

      const company = await this._companyService.saveCompanyService.handler(companyRaw)

      return SuccessResponse.handler(res, JSON.stringify(company))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }

  async updateCompany (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const companyRaw = req.body

      if (!companyRaw) {
        return BadRequestResponse.handler(res, 'No data provided.')
      }

      const company = await this._companyService.updateCompanyService.handler(companyRaw)

      return SuccessResponse.handler(res, JSON.stringify(company))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }

  async deleteCompany (req: IRequest, res: IResponse): Promise<IResponse> {
    try {
      const id = parseInt(req.body.id)

      if (!id) {
        return BadRequestResponse.handler(res, 'No id provided.')
      }

      const company = await this._companyService.deleteCompanyService.handler(id)

      return SuccessResponse.handler(res, JSON.stringify(company))
    } catch (error) {
      return InternalServerErrorResponse.handler(res, error.message)
    }
  }
}
