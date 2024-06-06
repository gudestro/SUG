import { IRequest } from './IRequest'
import { IResponse } from './IResponse'

export interface IController {
  handler(request: IRequest, response: IResponse): Promise<IResponse>
}
