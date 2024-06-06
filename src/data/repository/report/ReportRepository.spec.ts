import { PrismaClient } from '@prisma/client'
import { IReport } from '../../../domain/data/entity/IReport'
import { PrismaReportRepository } from './ReportRepository'

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    report: {
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
  sut: PrismaReportRepository
}

const makeSut = (): SutTypes => {
  const prismaMock = new PrismaClient()
  const sut = new PrismaReportRepository(prismaMock)

  return {
    sut,
    prismaMock
  }
}

describe('PrismaReportRepository', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should insert report', async () => {
    const { sut, prismaMock } = makeSut()

    const reportData: Omit<IReport, 'id' | 'createdAt'> = {
      userId: 1,
      scheduleId: 1,
      constructionId: 1,
      description: 'Report description'
    }

    // @ts-expect-error
    prismaMock.report.create.mockResolvedValue(reportData)

    const result = await sut.insertReport(reportData)

    expect(result).toEqual(reportData)
    expect(prismaMock.report.create).toHaveBeenCalledWith({ data: reportData })
  })

  it('should update report', async () => {
    const { sut, prismaMock } = makeSut()

    const reportToUpdate: IReport = {
      id: 1,
      userId: 1,
      scheduleId: 1,
      constructionId: 1,
      createdAt: new Date(),
      description: 'Updated report description'
    }

    // @ts-expect-error
    prismaMock.report.update.mockResolvedValue(reportToUpdate)

    const result = await sut.updateReport(reportToUpdate)

    expect(result).toEqual(reportToUpdate)
    expect(prismaMock.report.update).toHaveBeenCalledWith({
      data: {
        userId: reportToUpdate.userId,
        createdAt: reportToUpdate.createdAt,
        scheduleId: reportToUpdate.scheduleId,
        constructionId: reportToUpdate.constructionId,
        description: reportToUpdate.description
      },
      where: { id: reportToUpdate.id }
    })
  })

  it('should get report by id', async () => {
    const { sut, prismaMock } = makeSut()

    const reportId = 1
    const reportData: IReport = {
      id: reportId,
      userId: 1,
      scheduleId: 1,
      constructionId: 1,
      createdAt: new Date(),
      description: 'Report description'
    }

    // @ts-expect-error
    prismaMock.report.findUnique.mockResolvedValue(reportData)

    const result = await sut.getReport(reportId)

    expect(result).toEqual(reportData)
    expect(prismaMock.report.findUnique).toHaveBeenCalledWith({ where: { id: reportId } })
  })

  it('should return null when getting non-existing report by id', async () => {
    const { sut, prismaMock } = makeSut()

    const reportId = 1

    // @ts-expect-error
    prismaMock.report.findUnique.mockResolvedValue(null)

    const result = await sut.getReport(reportId)

    expect(result).toBeNull()
    expect(prismaMock.report.findUnique).toHaveBeenCalledWith({ where: { id: reportId } })
  })

  it('should get report by user id', async () => {
    const { sut, prismaMock } = makeSut()

    const userId = 1
    const reports: IReport[] = [
      {
        id: 1,
        userId: userId,
        scheduleId: 1,
        constructionId: 1,
        createdAt: new Date(),
        description: 'Report 1 description'
      },
      {
        id: 2,
        userId: userId,
        scheduleId: 2,
        constructionId: 1,
        createdAt: new Date(),
        description: 'Report 2 description'
      }
    ]

    // @ts-expect-error
    prismaMock.report.findMany.mockResolvedValue(reports)

    const result = await sut.getReportByUserId(userId)

    expect(result).toEqual(reports)
    expect(prismaMock.report.findMany).toHaveBeenCalledWith({ where: { userId } })
  })

  it('should get report by schedule id', async () => {
    const { sut, prismaMock } = makeSut()

    const scheduleId = 1
    const reports: IReport[] = [
      {
        id: 1,
        userId: 1,
        scheduleId: scheduleId,
        constructionId: 1,
        createdAt: new Date(),
        description: 'Report 1 description'
      },
      {
        id: 2,
        userId: 2,
        scheduleId: scheduleId,
        constructionId: 2,
        createdAt: new Date(),
        description: 'Report 2 description'
      }
    ]

    // @ts-expect-error
    prismaMock.report.findMany.mockResolvedValue(reports)

    const result = await sut.getReportBySchedulesId(scheduleId)

    expect(result).toEqual(reports)
    expect(prismaMock.report.findMany).toHaveBeenCalledWith({ where: { scheduleId } })
  })

  it('should get report by construction id', async () => {
    const { sut, prismaMock } = makeSut()

    const constructionId = 1
    const reports: IReport[] = [
      {
        id: 1,
        userId: 1,
        scheduleId: 1,
        createdAt: new Date(),
        constructionId: constructionId,
        description: 'Report 1 description'
      },
      {
        id: 2,
        userId: 2,
        scheduleId: 2,
        createdAt: new Date(),
        constructionId: constructionId,
        description: 'Report 2 description'
      }
    ]

    // @ts-expect-error
    prismaMock.report.findMany.mockResolvedValue(reports)

    const result = await sut.getReportByConstructionId(constructionId)

    expect(result).toEqual(reports)
    expect(prismaMock.report.findMany).toHaveBeenCalledWith({ where: { constructionId } })
  })

  it('should delete report', async () => {
    const { sut, prismaMock } = makeSut()

    const reportId = 1
    const reportData: IReport = {
      id: reportId,
      userId: 1,
      scheduleId: 1,
      constructionId: 1,
      createdAt: new Date(),
      description: 'Report description'
    }

    // @ts-expect-error
    prismaMock.report.findUnique.mockResolvedValue(reportData)
    // @ts-expect-error
    prismaMock.report.delete.mockResolvedValue(reportData)

    const result = await sut.deleteReport(reportId)

    expect(result).toEqual(reportData)
    expect(prismaMock.report.findUnique).toHaveBeenCalledWith({ where: { id: reportId } })
    expect(prismaMock.report.delete).toHaveBeenCalledWith({ where: { id: reportId } })
  })

  it('should throw error when deleting non-existing report', async () => {
    const { sut, prismaMock } = makeSut()

    const reportId = 1

    // @ts-expect-error
    prismaMock.report.findUnique.mockResolvedValue(null)

    await expect(sut.deleteReport(reportId)).rejects.toThrowError('[ENTITY - REPORT]: Relatório não encontrado')
  })
})
