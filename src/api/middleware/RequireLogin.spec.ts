import { requireLogin } from './RequireLogin'
import { IRequest } from '../common/IRequest'
import { IResponse } from '../common/IResponse'
import { INext } from '../common/INext'

describe('requireLogin', () => {
  let req: IRequest
  let res: IResponse
  let next: INext

  beforeEach(() => {
    req = {} as unknown as IRequest
    res = {
      redirect: jest.fn()
    } as unknown as IResponse
    next = jest.fn()
  })

  it('should redirect to login page if user is not authenticated', () => {
    requireLogin(req, res, next)

    expect(res.redirect).toHaveBeenCalledWith('/login')
  })

  it('should call next middleware if user is authenticated', () => {
    req.user = { email: 'any_email' }

    requireLogin(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.redirect).not.toHaveBeenCalled()
  })
})
