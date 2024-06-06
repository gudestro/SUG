import { LoginController } from './LoginController'
import { makeLoginService } from '../../../service/login/LoginServiceFactory'

export const makeLoginController = (): LoginController => {
  const loginService = makeLoginService()
  return new LoginController(loginService.loginService)
}
