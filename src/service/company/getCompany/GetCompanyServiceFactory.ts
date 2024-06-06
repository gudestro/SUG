import { GetCompanyService } from './GetCompanyService'
import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { PrismaCompanyRepository } from '../../../data/repository/company/CompanyRepository'
import { IGetCompanyService } from '../../../domain/service/company/getCompany/IGetCompanyService'

interface FactoryTypes {
  getCompanyService: IGetCompanyService
}

export const makeGetCompanyService = (): FactoryTypes => {
  const companyRepository = new PrismaCompanyRepository(prismaClient.getClient())

  const getCompanyService = new GetCompanyService(companyRepository)

  return { getCompanyService }
}
