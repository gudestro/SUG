import { ICompany } from '../../../data/entity/ICompany'

export interface IGetCompanyService {
  handler (id: number): Promise<ICompany|Error>
}
