import { IResponse } from '../IResponse'

export class BadRequestResponse {
  static async handler (response: IResponse, message: string): Promise<IResponse> {
    return response.status(400).json({
      message: message
    })
  }
}
