import path from 'path'
import express from 'express'
import passport from 'passport'
import * as dotenv from 'dotenv'
import bodyParser from 'body-parser'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import { ErrorController } from '../api/controller/error/ErrorController'
import { makePrismaUserRepository } from '../data/repository/user/UserRepositoryFactory'
dotenv.config({ path: path.join(__dirname, '../../.env') })

export class App {
  public app: express.Application
  public port: Number

  constructor (controllers) {
    this.app = express()
    this.port = parseInt(process.env.PORT, 10)

    this.setupExpress()
    this.setupMiddlewaresStart()
    this.setupPassport()
    this.setupControllers(controllers)
    this.setupMiddlewaresEnd()
  }

  private setupControllers (controllers): void {
    controllers.forEach((controller) => {
      this.app.use(controller.router)
    })

    this.app.use('/error-test', (req, res, next) => {
      throw new Error('to test error screen')
    })
    this.app.use(ErrorController.error404)
    this.app.use(ErrorController.error500)
  }

  private setupExpress (): void {
    this.app.set('port', process.env.PORT)
    this.app.set('views', path.join(__dirname, '../presentation/views'))
    this.app.set('view engine', 'pug')
  }

  private setupMiddlewaresStart (): void {
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(cookieParser())
    this.app.use(
      session({
        secret: process.env.SECRET_SESSION,
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false }
      })
    )

    this.app.use((req, res, next) => {
      res.setHeader('x-powered-by', 'mix-universe')
      next()
    })

    this.app.use(
      express.static(path.join(__dirname, '../presentation/'))
    )
  }

  private setupMiddlewaresEnd (): void {
    this.app.use((req, res, next) => {
      next()
    })
  }

  private setupPassport (): void {
    this.app.use(passport.initialize())
    this.app.use(passport.session())
    passport.serializeUser((user: any, done) => {
      done(null, user.id)
    })

    passport.deserializeUser(async (_id, done) => {
      const userRepository = makePrismaUserRepository()
      const { id, email, admin, name, categoryRules } = await userRepository.getUser('id', _id)
      if (id) {
        done(null, { id, email, admin, name, categoryRules })
        return
      }
      done(null, false)
    })
  }

  async listen (): Promise<void> {
    return new Promise((resolve) => {
      this.app.listen(this.port, () => {
        console.log(
          `\x1b[36m\nApp listening on the port ${this.port.toString()}\x1b[0m`
        )
        resolve()
      })
    })
  }
}
