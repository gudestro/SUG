import { makeAllocationController } from '../api/controller/allocation/AllocationControllerFactory'
import { makeCompanyController } from '../api/controller/company/CompanyControllerFactory'
import { makeConstructionController } from '../api/controller/construction/ConstructionControllerFactory'
import { makeHomeController } from '../api/controller/home/HomeControllerFactory'
import { makeLoginController } from '../api/controller/login/LoginControllerFactory'
import { makeReportController } from '../api/controller/report/ReportControllerFactory'
import { makeScheduleController } from '../api/controller/schedule/ScheduleControllerFactory'
import { makeUserController } from '../api/controller/user/userControllerFactory'
import { App } from './App'

export const makeApp = (): App => {
  const userController = makeUserController()
  const homeController = makeHomeController()
  const loginController = makeLoginController()
  const companyController = makeCompanyController()
  const constructionController = makeConstructionController()
  const allocationController = makeAllocationController()
  const schedulesController = makeScheduleController()
  const reportController = makeReportController()
  const app = new App([
    loginController,
    userController,
    homeController,
    companyController,
    constructionController,
    allocationController,
    schedulesController,
    reportController
  ])

  return app
}
