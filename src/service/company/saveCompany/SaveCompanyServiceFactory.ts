import { SaveCompanyService } from './SaveCompanyService'
import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { PrismaCompanyRepository } from '../../../data/repository/company/CompanyRepository'
import { ISaveCompanyService } from '../../../domain/service/company/saveCompany/ISaveCompanyService'
import { Validation } from '../../../domain/utils/validator'

interface FactoryTypes {
  saveCompanyService: ISaveCompanyService
}

export const makeSaveCompanyService = (validator: Validation): FactoryTypes => {
  const repository = new PrismaCompanyRepository(prismaClient.getClient())

  const saveCompanyService = new SaveCompanyService(repository, validator)

  return { saveCompanyService }
}
