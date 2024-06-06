import { IResponse } from '../IResponse'

export class InternalServerErrorResponse {
  static async handler (response: IResponse, message: string): Promise<IResponse> {
    return response.status(500).json({
      message: message
    })
  }
}
