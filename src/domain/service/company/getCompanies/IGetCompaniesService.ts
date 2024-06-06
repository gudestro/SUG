import { ICompany } from '../../../data/entity/ICompany'

export interface IGetCompaniesService {
  handler (): Promise<ICompany[]|Error>
}
