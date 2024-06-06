import { IResponse } from '../IResponse'

export class ForbiddenResponse {
  static async handler (response: IResponse, message: string): Promise<IResponse> {
    return response.status(403).json({
      message: message
    })
  }
}
