import { PrismaClient } from '@prisma/client'
import { ISchedule } from '../../../domain/data/entity/ISchedule'
import { PrismaSchedulesRepository } from './SchedulesRepository'

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    schedule: {
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
  sut: PrismaSchedulesRepository
}

const makeSut = (): SutTypes => {
  const prismaMock = new PrismaClient()
  const sut = new PrismaSchedulesRepository(prismaMock)

  return {
    sut,
    prismaMock
  }
}

describe('PrismaSchedulesRepository', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should insert schedule', async () => {
    const { sut, prismaMock } = makeSut()

    const scheduleData: Omit<ISchedule, 'id' | 'createdAt'> = {
      userId: 1,
      status: '',
      constructionId: 1,
      allocationId: 1,
      dateSchedule: new Date()
    }

    prismaMock.schedule.create.mockResolvedValue(scheduleData)

    const result = await sut.insertSchedule(scheduleData)

    expect(result).toEqual(scheduleData)
    expect(prismaMock.schedule.create).toHaveBeenCalledWith({ data: scheduleData })
  })

  it('should update schedule', async () => {
    const { sut, prismaMock } = makeSut()

    const scheduleToUpdate: ISchedule = {
      id: 1,
      status: '',
      userId: 1,
      allocationId: 1,
      constructionId: 1,
      createdAt: new Date(),
      dateSchedule: new Date()
    }

    prismaMock.schedule.update.mockResolvedValue(scheduleToUpdate)

    const result = await sut.updateSchedule(scheduleToUpdate)

    expect(result).toEqual(scheduleToUpdate)
    expect(prismaMock.schedule.update).toHaveBeenCalledWith({
      data: {
        userId: scheduleToUpdate.userId,
        status: scheduleToUpdate.status,
        createdAt: scheduleToUpdate.createdAt,
        allocationId: scheduleToUpdate.allocationId,
        dateSchedule: scheduleToUpdate.dateSchedule,
        constructionId: scheduleToUpdate.constructionId
      },
      where: { id: scheduleToUpdate.id }
    })
  })

  it('should get schedule by id', async () => {
    const { sut, prismaMock } = makeSut()

    const scheduleId = 1
    const scheduleData: ISchedule = {
      id: 1,
      userId: 1,
      status: '',
      allocationId: 1,
      constructionId: 1,
      createdAt: new Date(),
      dateSchedule: new Date()
    }

    prismaMock.schedule.findUnique.mockResolvedValue(scheduleData)

    const result = await sut.getSchedule(scheduleId)

    expect(result).toEqual(scheduleData)
    expect(prismaMock.schedule.findUnique).toHaveBeenCalledWith({ where: { id: scheduleId } })
  })

  it('should return null when getting non-existing schedule by id', async () => {
    const { sut, prismaMock } = makeSut()

    const scheduleId = 1

    prismaMock.schedule.findUnique.mockResolvedValue(null)

    const result = await sut.getSchedule(scheduleId)

    expect(result).toBeNull()
    expect(prismaMock.schedule.findUnique).toHaveBeenCalledWith({ where: { id: scheduleId } })
  })

  it('should get schedules', async () => {
    const { sut, prismaMock } = makeSut()

    const schedules: ISchedule[] = [
      {
        id: 1,
        userId: 1,
        status: '',
        allocationId: 1,
        constructionId: 1,
        createdAt: new Date(),
        dateSchedule: new Date()
      },
      {
        id: 2,
        userId: 1,
        status: '',
        allocationId: 1,
        constructionId: 1,
        createdAt: new Date(),
        dateSchedule: new Date()
      }
    ]

    prismaMock.schedule.findMany.mockResolvedValue(schedules)

    const result = await sut.getSchedules()

    expect(result).toEqual(schedules)
    expect(prismaMock.schedule.findMany).toHaveBeenCalledWith({})
  })

  it('should get schedules by user id', async () => {
    const { sut, prismaMock } = makeSut()

    const userId = 1
    const schedules: ISchedule[] = [
      {
        id: 1,
        userId: 1,
        status: '',
        allocationId: 1,
        constructionId: 1,
        createdAt: new Date(),
        dateSchedule: new Date()
      },
      {
        id: 2,
        userId: 1,
        status: '',
        allocationId: 1,
        constructionId: 1,
        createdAt: new Date(),
        dateSchedule: new Date()
      }
    ]

    prismaMock.schedule.findMany.mockResolvedValue(schedules)

    const result = await sut.getScheduleByUserId(userId)

    expect(result).toEqual(schedules)
    expect(prismaMock.schedule.findMany).toHaveBeenCalledWith({ where: { userId } })
  })

  it('should get schedules by construction id', async () => {
    const { sut, prismaMock } = makeSut()

    const constructionId = 1
    const schedules: ISchedule[] = [
      {
        id: 1,
        userId: 1,
        status: '',
        allocationId: 1,
        constructionId: 1,
        createdAt: new Date(),
        dateSchedule: new Date()
      },
      {
        id: 2,
        userId: 1,
        status: '',
        allocationId: 1,
        constructionId: 1,
        createdAt: new Date(),
        dateSchedule: new Date()
      }
    ]

    prismaMock.schedule.findMany.mockResolvedValue(schedules)

    const result = await sut.getScheduleByConstructionId(constructionId)

    expect(result).toEqual(schedules)
    expect(prismaMock.schedule.findMany).toHaveBeenCalledWith({ where: { constructionId } })
  })

  it('should get schedules by allocation id', async () => {
    const { sut, prismaMock } = makeSut()

    const allocationId = 1
    const schedules: ISchedule[] = [
      {
        id: 1,
        userId: 1,
        status: '',
        allocationId: 1,
        constructionId: 1,
        createdAt: new Date(),
        dateSchedule: new Date()
      },
      {
        id: 2,
        userId: 1,
        allocationId: 1,
        constructionId: 1,
        status: '',
        createdAt: new Date(),
        dateSchedule: new Date()
      }
    ]

    prismaMock.schedule.findMany.mockResolvedValue(schedules)

    const result = await sut.getScheduleByAllocationId(allocationId)

    expect(result).toEqual(schedules)
    expect(prismaMock.schedule.findMany).toHaveBeenCalledWith({ where: { allocationId } })
  })

  it('should delete schedule', async () => {
    const { sut, prismaMock } = makeSut()

    const scheduleId = 1
    const scheduleData: ISchedule = {
      id: 1,
      userId: 1,
      allocationId: 1,
      status: '',
      constructionId: 1,
      createdAt: new Date(),
      dateSchedule: new Date()
    }

    prismaMock.schedule.findUnique.mockResolvedValue(scheduleData)

    prismaMock.schedule.delete.mockResolvedValue(scheduleData)

    const result = await sut.deleteSchedule(scheduleId)

    expect(result).toEqual(scheduleData)
    expect(prismaMock.schedule.findUnique).toHaveBeenCalledWith({ where: { id: scheduleId } })
    expect(prismaMock.schedule.delete).toHaveBeenCalledWith({ where: { id: scheduleId } })
  })

  it('should throw error when deleting non-existing schedule', async () => {
    const { sut, prismaMock } = makeSut()

    const scheduleId = 1

    prismaMock.schedule.findUnique.mockResolvedValue(null)

    await expect(sut.deleteSchedule(scheduleId)).rejects.toThrowError('[ENTITY - SCHEDULES]: Agendamento não encontrado')
  })
})
