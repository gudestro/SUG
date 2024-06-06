import { PrismaClient } from '@prisma/client'
import { IConstruction } from '../../../domain/data/entity/IConstruction'
import { PrismaConstructionRepository } from './ConstructionRepository'

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    construction: {
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
  sut: PrismaConstructionRepository
}

const makeSut = (): SutTypes => {
  const prismaMock = new PrismaClient()
  const sut = new PrismaConstructionRepository(prismaMock)

  return {
    sut,
    prismaMock
  }
}

describe('PrismaConstructionRepository', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should insert construction', async () => {
    const { sut, prismaMock } = makeSut()

    const constructionData: Omit<IConstruction, 'id'> = {
      companyId: 1,
      name: 'Construction 1'
    }

    // @ts-expect-error
    prismaMock.construction.create.mockResolvedValue(constructionData)

    const result = await sut.insertConstruction(constructionData)

    expect(result).toEqual(constructionData)
    expect(prismaMock.construction.create).toHaveBeenCalledWith({ data: constructionData })
  })

  it('should update construction', async () => {
    const { sut, prismaMock } = makeSut()

    const constructionToUpdate: IConstruction = {
      id: 1,
      companyId: 1,
      name: 'Construction 1'
    }

    // @ts-expect-error
    prismaMock.construction.update.mockResolvedValue(constructionToUpdate)

    const result = await sut.updateConstruction(constructionToUpdate)

    expect(result).toEqual(constructionToUpdate)
    expect(prismaMock.construction.update).toHaveBeenCalledWith({
      data: {
        name: constructionToUpdate.name,
        companyId: constructionToUpdate.companyId
      },
      where: { id: constructionToUpdate.id }
    })
  })

  it('should get construction by id', async () => {
    const { sut, prismaMock } = makeSut()

    const constructionId = 1
    const constructionData: IConstruction = {
      id: 1,
      companyId: 1,
      name: 'Construction 1'
    }

    // @ts-expect-error
    prismaMock.construction.findUnique.mockResolvedValue(constructionData)

    const result = await sut.getConstruction(constructionId)

    expect(result).toEqual(constructionData)
    expect(prismaMock.construction.findUnique).toHaveBeenCalledWith({ where: { id: constructionId } })
  })

  it('should return null when getting non-existing construction by id', async () => {
    const { sut, prismaMock } = makeSut()

    const constructionId = 1

    // @ts-expect-error
    prismaMock.construction.findUnique.mockResolvedValue(null)

    const result = await sut.getConstruction(constructionId)

    expect(result).toBeNull()
    expect(prismaMock.construction.findUnique).toHaveBeenCalledWith({ where: { id: constructionId } })
  })

  it('should get all constructions', async () => {
    const { sut, prismaMock } = makeSut()

    const constructions: IConstruction[] = [
      {
        id: 1,
        companyId: 1,
        name: 'Construction 1'
      },
      {
        id: 2,
        companyId: 1,
        name: 'Construction 1'
      }
    ]

    // @ts-expect-error
    prismaMock.construction.findMany.mockResolvedValue(constructions)

    const result = await sut.getConstructions()

    expect(result).toEqual(constructions)
    expect(prismaMock.construction.findMany).toHaveBeenCalledWith({})
  })

  it('should delete construction', async () => {
    const { sut, prismaMock } = makeSut()

    const constructionId = 1
    const constructionData: IConstruction = {
      id: 1,
      companyId: 1,
      name: 'Construction 1'
    }

    // @ts-expect-error
    prismaMock.construction.findUnique.mockResolvedValue(constructionData)
    // @ts-expect-error
    prismaMock.construction.delete.mockResolvedValue(constructionData)

    const result = await sut.deleteConstruction(constructionId)

    expect(result).toEqual(constructionData)
    expect(prismaMock.construction.findUnique).toHaveBeenCalledWith({ where: { id: constructionId } })
    expect(prismaMock.construction.delete).toHaveBeenCalledWith({ where: { id: constructionId } })
  })

  it('should throw error when deleting non-existing construction', async () => {
    const { sut, prismaMock } = makeSut()

    const constructionId = 1

    // @ts-expect-error
    prismaMock.construction.findUnique.mockResolvedValue(null)

    await expect(sut.deleteConstruction(constructionId)).rejects.toThrowError('[ENTITY - CONSTRUCTION]: Construção não encontrada')
  })
})
