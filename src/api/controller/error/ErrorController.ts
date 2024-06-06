import { INext } from '../../common/INext'
import { IRequest } from '../../common/IRequest'
import { IResponse } from '../../common/IResponse'

export class ErrorController {
  static async error404 (
    err,
    request: IRequest,
    response: IResponse,
    next: INext
  ): Promise<void> {
    console.error(err)
    if (response.headersSent) {
      next(err)
      return
    }
    response.status(500).render('errors/404', {
      content: {
        metatags: {
          title: 'F',
          description: 'Tente recarregar.'
        }
      }
    })
  }

  static async error500 (
    err,
    request: IRequest,
    response: IResponse,
    next: INext
  ): Promise<void> {
    console.error(err)
    if (response.headersSent) {
      next(err)
      return
    }
    response.status(500).render('errors/500', {
      content: {
        metatags: {
          title: 'F',
          description: 'Tente recarregar.'
        }
      }
    })
  }
}
