import { IResponse } from '../IResponse'

export class NotFoundResponse {
  static async handler (response: IResponse, message: string): Promise<IResponse> {
    return response.status(404).json({
      message: message
    })
  }
}
