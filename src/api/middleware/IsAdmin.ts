import { IRequest } from '../common/IRequest'
import { IResponse } from '../common/IResponse'
import { INext } from '../common/INext'

export const isAdmin = (req: IRequest, res: IResponse, next: INext): void => {
  if (!req.user.admin) {
    res.redirect('/')
    return
  }
  next()
}
