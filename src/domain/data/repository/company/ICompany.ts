import { PrismaClient } from '@prisma/client'
import { ICompany } from '../../entity/ICompany'

export interface ICompanyRepository {
  readonly _prismaClient: PrismaClient
  getCompanies (): Promise<ICompany[]>
  getCompany (id: number): Promise<ICompany>
  deleteCompany (id: number): Promise<ICompany>
  updateCompany (CompanyToUpdate: ICompany): Promise<ICompany>
  insertCompany (data: Omit<ICompany, 'id'>): Promise<ICompany>
}
