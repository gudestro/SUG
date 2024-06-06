import { GetCompaniesService } from './GetCompaniesService'
import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { PrismaCompanyRepository } from '../../../data/repository/company/CompanyRepository'
import { IGetCompaniesService } from '../../../domain/service/company/getCompanies/IGetCompaniesService'

interface FactoryTypes {
  getCompaniesService: IGetCompaniesService
}

export const makeGetCompaniesService = (): FactoryTypes => {
  const repository = new PrismaCompanyRepository(prismaClient.getClient())

  const getCompaniesService = new GetCompaniesService(repository)

  return { getCompaniesService }
}
