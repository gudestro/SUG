import { PrismaClient } from '@prisma/client'
import { ICompany } from '../../../domain/data/entity/ICompany'
import { PrismaCompanyRepository } from './CompanyRepository'

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    company: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn()
    }
  }))
}))

interface SutTypes {
  prismaMock: PrismaClient
  sut: PrismaCompanyRepository
}

const makeSut = (): SutTypes => {
  const prismaMock = new PrismaClient()
  const sut = new PrismaCompanyRepository(prismaMock)

  return {
    sut,
    prismaMock
  }
}

describe('PrismaCompanyRepository', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should insert company', async () => {
    const { sut, prismaMock } = makeSut()

    const data: Omit<ICompany, 'id' |'createdAt'> = {
      cnpj: '12345678901234',
      nameCompany: 'Test Company',
      nameResponsiblePerson: 'John Doe',
      contactResponsiblePerson: 'john@example.com',
      contact: 'contact@example.com'
    }

    const companyExpected: ICompany = { ...data, id: 1, createdAt: new Date('2024-02-06') }

    // @ts-expect-error
    prismaMock.company.findUnique.mockResolvedValue(null)
    // @ts-expect-error
    prismaMock.company.create.mockResolvedValue(companyExpected)

    const result = await sut.insertCompany(data)

    expect(result).toEqual(companyExpected)
    expect(prismaMock.company.findUnique).toHaveBeenCalledWith({ where: { cnpj: data.cnpj } })
    expect(prismaMock.company.create).toHaveBeenCalledWith({ data })
  })

  it('should not insert company if it already exists', async () => {
    const { sut, prismaMock } = makeSut()

    const data: Omit<ICompany, 'id' |'createdAt'> = {
      cnpj: '12345678901234',
      nameCompany: 'Test Company',
      nameResponsiblePerson: 'John Doe',
      contactResponsiblePerson: 'john@example.com',
      contact: 'contact@example.com'
    }

    // @ts-expect-error
    prismaMock.company.findUnique.mockResolvedValue(data)

    await expect(sut.insertCompany(data)).rejects.toThrowError('[ENTITY- COMPANY]: Empresa já cadastrada')
  })

  it('should update company', async () => {
    const { sut, prismaMock } = makeSut()

    const companyToUpdate: ICompany = {
      id: 1,
      createdAt: new Date(),
      cnpj: '12345678901234',
      nameCompany: 'Updated Company',
      nameResponsiblePerson: 'Jane Doe',
      contactResponsiblePerson: 'jane@example.com',
      contact: 'updated_contact@example.com'
    }

    const companyExpected: ICompany = { ...companyToUpdate }

    // @ts-expect-error
    prismaMock.company.findUnique.mockResolvedValue({ ...companyToUpdate })
    // @ts-expect-error
    prismaMock.company.update.mockResolvedValue(companyExpected)

    const result = await sut.updateCompany(companyToUpdate)

    expect(result).toEqual(companyExpected)
    expect(prismaMock.company.findUnique).toHaveBeenCalledWith({ where: { cnpj: companyToUpdate.cnpj } })
    expect(prismaMock.company.update).toHaveBeenCalledWith({
      data: {
        nameCompany: companyToUpdate.nameCompany,
        nameResponsiblePerson: companyToUpdate.nameResponsiblePerson,
        contactResponsiblePerson: companyToUpdate.contactResponsiblePerson,
        contact: companyToUpdate.contact
      },
      where: { cnpj: companyToUpdate.cnpj }
    })
  })

  it('should throw error when updating non-existing company', async () => {
    const { sut } = makeSut()

    const companyToUpdate: ICompany = {
      id: 1,
      createdAt: new Date(),
      cnpj: '12345678901234',
      nameCompany: 'Updated Company',
      nameResponsiblePerson: 'Jane Doe',
      contactResponsiblePerson: 'jane@example.com',
      contact: 'updated_contact@example.com'
    }

    await expect(sut.updateCompany(companyToUpdate)).rejects.toThrowError('[ENTITY- COMPANY]: Empresa não encontrada')
  })

  it('should throw error when insert without cnpj', async () => {
    const { sut } = makeSut()

    const companyToUpdate: any = {
      nameCompany: 'Test Company',
      nameResponsiblePerson: 'John Doe',
      contactResponsiblePerson: 'john@example.com',
      contact: 'contact@example.com'
    }

    await expect(sut.insertCompany(companyToUpdate)).rejects.toThrowError('[ENTITY- COMPANY]: CNPJ obrigatório')
  })

  it('should throw error when update company registered', async () => {
    const { sut } = makeSut()

    const companyToUpdate: any = {
      id: 1,
      createdAt: new Date(),
      nameCompany: 'Updated Company',
      nameResponsiblePerson: 'Jane Doe',
      contactResponsiblePerson: 'jane@example.com',
      contact: 'updated_contact@example.com'
    }

    await expect(sut.updateCompany(companyToUpdate)).rejects.toThrowError('[ENTITY- COMPANY]: CNPJ obrigatório')
  })

  it('should get all companies', async () => {
    const { sut, prismaMock } = makeSut()

    const companies: ICompany[] = [
      {
        id: 1,
        createdAt: new Date(),
        cnpj: '12345678901234',
        nameCompany: 'Updated Company',
        nameResponsiblePerson: 'Jane Doe',
        contactResponsiblePerson: 'jane@example.com',
        contact: 'updated_contact@example.com'
      },
      {
        id: 2,
        createdAt: new Date(),
        cnpj: '12345678901234',
        nameCompany: 'Updated Company',
        nameResponsiblePerson: 'Jane Doe',
        contactResponsiblePerson: 'jane@example.com',
        contact: 'updated_contact@example.com'
      }
    ]

    // @ts-expect-error
    prismaMock.company.findMany.mockResolvedValue(companies)

    const result = await sut.getCompanies()

    expect(result).toEqual(companies)
    expect(prismaMock.company.findMany).toHaveBeenCalledWith()
  })

  it('should get company by CNPJ', async () => {
    const { sut, prismaMock } = makeSut()

    const id = 1
    const company: ICompany = {
      id: 1,
      createdAt: new Date(),
      cnpj: '12345678901234',
      nameCompany: 'Updated Company',
      nameResponsiblePerson: 'Jane Doe',
      contactResponsiblePerson: 'jane@example.com',
      contact: 'updated_contact@example.com'
    }

    // @ts-expect-error
    prismaMock.company.findUnique.mockResolvedValue(company)

    const result = await sut.getCompany(id)

    expect(result).toEqual(company)
    expect(prismaMock.company.findUnique).toHaveBeenCalledWith({ where: { id } })
  })

  it('should undefined when getting non-existing company by CNPJ', async () => {
    const { sut } = makeSut()

    const id = 1

    const result = await sut.getCompany(id)

    expect(result).toBeUndefined()
  })

  it('should delete company', async () => {
    const { sut, prismaMock } = makeSut()

    const id = 1
    const company: ICompany = {
      id: 1,
      createdAt: new Date(),
      cnpj: '12345678901234',
      nameCompany: 'Updated Company',
      nameResponsiblePerson: 'Jane Doe',
      contactResponsiblePerson: 'jane@example.com',
      contact: 'updated_contact@example.com'
    }

    // @ts-expect-error
    prismaMock.company.findUnique.mockResolvedValue(company)
    // @ts-expect-error
    prismaMock.company.delete.mockResolvedValue(company)

    const result = await sut.deleteCompany(id)

    expect(result).toEqual(company)
    expect(prismaMock.company.findUnique).toHaveBeenCalledWith({ where: { id } })
    expect(prismaMock.company.delete).toHaveBeenCalledWith({ where: { id } })
  })

  it('should throw error when deleting non-existing company', async () => {
    const { sut } = makeSut()

    const id = 1

    await expect(sut.deleteCompany(id)).rejects.toThrowError('[ENTITY- COMPANY]: Empresa não encontrada')
  })
})
