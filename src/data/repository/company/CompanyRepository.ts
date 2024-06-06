import { PrismaClient } from '@prisma/client'
import { ICompany } from '../../../domain/data/entity/ICompany'
import { ICompanyRepository } from '../../../domain/data/repository/company/ICompany'

export class PrismaCompanyRepository implements ICompanyRepository {
  constructor (readonly _prismaClient: PrismaClient) {}

  private map (object: any): ICompany {
    const company: ICompany = {
      id: object.id,
      cnpj: object.cnpj,
      contact: object.contact,
      createdAt: new Date(object.createdAt),
      nameCompany: object.nameCompany,
      nameResponsiblePerson: object.nameResponsiblePerson,
      contactResponsiblePerson: object.contactResponsiblePerson
    }

    if (object.updatedAt) {
      company.updatedAt = new Date(object.updatedAt)
    }

    return company
  }

  async insertCompany (data: Omit<ICompany, 'id' |'createdAt'>): Promise<ICompany> {
    if (!data.cnpj) {
      throw new Error('[ENTITY- COMPANY]: CNPJ obrigatório')
    }

    const company = await this._prismaClient.company.findUnique({ where: { cnpj: data.cnpj } })

    if (company) {
      throw new Error('[ENTITY- COMPANY]: Empresa já cadastrada')
    }

    const register = await this._prismaClient.company.create({ data })

    return this.map(register)
  }

  async updateCompany (companyToUpdate: ICompany): Promise<ICompany> {
    if (!companyToUpdate.cnpj) {
      throw new Error('[ENTITY- COMPANY]: CNPJ obrigatório')
    }

    const company = await this._prismaClient.company.findUnique({ where: { cnpj: companyToUpdate.cnpj } })

    if (!company) {
      throw new Error('[ENTITY- COMPANY]: Empresa não encontrada')
    }

    const data = {
      contact: companyToUpdate.contact,
      updatedAt: companyToUpdate.updatedAt,
      nameCompany: companyToUpdate.nameCompany,
      nameResponsiblePerson: companyToUpdate.nameResponsiblePerson,
      contactResponsiblePerson: companyToUpdate.contactResponsiblePerson
    }

    const register = await this._prismaClient.company.update({ data, where: { cnpj: companyToUpdate.cnpj } })

    return this.map(register)
  }

  async getCompanies (): Promise<ICompany[]> {
    const listCompany = await this._prismaClient.company.findMany({
      orderBy: [
        {
          id: 'asc'
        }
      ]
    })

    return listCompany.map(this.map)
  }

  async getCompany (id: number): Promise<ICompany> {
    const company = await this._prismaClient.company.findUnique({ where: { id: id } })

    return this.map(company)
  }

  async deleteCompany (id: number): Promise<ICompany> {
    const company = await this.getCompany(id)

    if (!company) {
      throw new Error('[ENTITY- COMPANY]: Empresa não encontrada')
    }

    const deleted = await this._prismaClient.company.delete({ where: { id } })

    return this.map(deleted)
  }
}
