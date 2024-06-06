import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { DeleteCompanyService } from './DeleteCompanyService'
import { PrismaCompanyRepository } from '../../../data/repository/company/CompanyRepository'
import { IDeleteCompanyService } from '../../../domain/service/company/deleteCompany/IDeleteCompanyService'
import { PrismaConstructionRepository } from '../../../data/repository/construction/ConstructionRepository'

interface FactoryTypes {
  deleteCompanyService: IDeleteCompanyService
}

export const makeDeleteCompanyService = (): FactoryTypes => {
  const companyRepository = new PrismaCompanyRepository(prismaClient.getClient())
  const constructionRepository = new PrismaConstructionRepository(prismaClient.getClient())
  const deleteCompanyService = new DeleteCompanyService(companyRepository, constructionRepository)

  return { deleteCompanyService }
}
