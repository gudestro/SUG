import { ICompany } from '../../../data/entity/ICompany'

export interface IDeleteCompanyService {
  handler (id: number): Promise<ICompany|Error>
}
