import { ICompany } from '../../../data/entity/ICompany'

export interface ISaveCompanyService {
  handler (company: Omit<ICompany, 'id'>): Promise<ICompany|Error>
}
