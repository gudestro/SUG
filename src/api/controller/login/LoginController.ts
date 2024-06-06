import express from 'express'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import { INext } from '../../common/INext'
import { IRequest } from '../../common/IRequest'
import { IResponse } from '../../common/IResponse'
import { IController } from '../../common/IController'
import { ILoginService } from '../../../domain/service/login/ILoginService'
import { BadRequestResponse } from '../../common/responses/BadRequestResponse'

export class LoginController implements IController {
  public router = express.Router()

  constructor (private readonly _login: ILoginService) {
    const localStrategy = new LocalStrategy(
      {
        usernameField: 'email',
        passReqToCallback: true
      },
      this.authenticate.bind(this)
    )
    passport.use('local', localStrategy)

    this.setupRoutes()
  }

  setupRoutes (): void {
    this.router.get('/login', this.handler.bind(this))
    this.router.post('/login', this.login.bind(this))
    this.router.get('/logout', this.logout.bind(this))
  }

  async handler (req: IRequest, res: IResponse): Promise<IResponse> {
    if (req.user) {
      res.status(200).redirect('/')
      return
    }
    res.status(200).render('./login.pug', {})
  }

  async _refreshSession (req): Promise<void> {
    return new Promise((resolve) => {
      req.session.regenerate(resolve)
    })
  }

  async logout (req: any, res: IResponse, next: INext): Promise<void> {
    req.logout(function (err) {
      if (err) { return next(err) }
      res.redirect('/login')
    })
    res.clearCookie('fid')
  }

  async login (req: IRequest, res: IResponse, next: INext): Promise<IResponse> {
    if (req.user) {
      res.redirect('/center')
      return
    }

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Credentials', 'true')

    const password: string = req.body.password?.trim() ?? undefined
    const email: string = req.body.email?.trim() ?? undefined

    if (!email || !password) {
      await BadRequestResponse.handler(res, 'Invalid request')
      return
    }
    passport.authenticate('local', null, async (err, user, info) => {
      if (err) {
        console.error(err)
        res.status(500).json({
          success: false,
          message: 'Um erro inesperado aconteceu. Tente novamente em alguns minutos.'
        })
        return
      }

      if (!user) {
        res.status(401).json({
          success: false,
          message: info.msg
        })
        return
      }

      await this._refreshSession(req)
      // @ts-expect-error
      req.logIn(user, () => {
        res.status(200).json({
          success: true
        })
      })
    })(req, res, next)
  }

  async authenticate (req, email: string, password: string, callback): Promise<void> {
    const user = await this._login.handler(email, password)

    if (user instanceof Error) {
      callback(null, false, {
        msg: user.message
      })
      return
    }

    await this._refreshSession(req)
    req.logIn(user, err => {
      callback(err, user)
    })
  }
}
