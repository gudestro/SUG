import { Request } from 'express'

export interface IRequest extends Request {
  user: {
    admin?: boolean
    email: string
    categoryRules: number
  }
}
