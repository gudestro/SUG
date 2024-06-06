import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { UpdateCompanyService } from './UpdateCompanyService'
import { PrismaCompanyRepository } from '../../../data/repository/company/CompanyRepository'
import { IUpdateCompanyService } from '../../../domain/service/company/updateCompany/IUpdateCompanyService'
import { Validation } from '../../../domain/utils/validator'

interface FactoryTypes {
  updateCompanyService: IUpdateCompanyService
}

export const makeUpdateCompanyService = (validator: Validation): FactoryTypes => {
  const repository = new PrismaCompanyRepository(prismaClient.getClient())

  const updateCompanyService = new UpdateCompanyService(repository, validator)

  return { updateCompanyService }
}
