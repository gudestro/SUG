import { ICompany } from '../../../data/entity/ICompany'

export interface IUpdateCompanyService {
  handler (company: ICompany): Promise<ICompany|Error>
}
