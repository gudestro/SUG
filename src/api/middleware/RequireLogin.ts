import { IRequest } from '../common/IRequest'
import { IResponse } from '../common/IResponse'
import { INext } from '../common/INext'

export const requireLogin = (req: IRequest, res: IResponse, next: INext): void => {
  if (!req.user) {
    // Redireciona o usuário para a página de login com o parâmetro de redirecionamento
    res.redirect('/login')
    return
  }
  next()
}
