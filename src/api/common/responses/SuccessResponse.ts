import { IResponse } from '../IResponse'

export class SuccessResponse {
  static async handler (response: IResponse, body: any): Promise<IResponse> {
    return response.status(200).json(body)
  }
}
