import { PrismaClient } from '@prisma/client'
import { PrismaUserRepository } from './UserRepository'
import { IUser } from '../../../domain/data/entity/IUser'

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    user: {
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
  sut: PrismaUserRepository
}

const makeSut = (): SutTypes => {
  const prismaMock = new PrismaClient()
  const sut = new PrismaUserRepository(prismaMock)

  return {
    sut,
    prismaMock
  }
}

describe('PrismaUserRepository', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should insert user', async () => {
    const { sut, prismaMock } = makeSut()

    const userData: Omit<IUser, 'id'> = {
      cpf: '12345678901',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123456789',
      admin: false,
      office: 'Developer',
      password: 'password',
      city: 'City',
      road: 'Road',
      zipCode: '12345678',
      numberHouse: '123',
      neighborhood: 'Neighborhood'
    }

    // @ts-expect-error
    prismaMock.user.create.mockResolvedValue(userData)

    const result = await sut.insertUser(userData)

    expect(result).toEqual(userData)
    expect(prismaMock.user.create).toHaveBeenCalledWith({ data: userData })
  })

  it('should update user', async () => {
    const { sut, prismaMock } = makeSut()

    const userToUpdate: IUser = {
      id: 1,
      createdAt: new Date(),
      cpf: '12345678901',
      name: 'Updated Name',
      email: 'updated@example.com',
      phone: '987654321',
      admin: true,
      office: 'Senior Developer',
      password: 'updatedpassword',
      city: 'Updated City',
      road: 'Updated Road',
      zipCode: '87654321',
      numberHouse: '321',
      neighborhood: 'Updated Neighborhood'
    }

    // @ts-expect-error
    prismaMock.user.findUnique.mockResolvedValue(userToUpdate)

    // @ts-expect-error
    prismaMock.user.update.mockResolvedValue(userToUpdate)

    const result = await sut.updateUser(userToUpdate)

    expect(result).toEqual(userToUpdate)
    expect(prismaMock.user.update).toHaveBeenCalledWith({
      data: expect.objectContaining({
        name: userToUpdate.name,
        email: userToUpdate.email,
        phone: userToUpdate.phone,
        admin: userToUpdate.admin,
        office: userToUpdate.office,
        password: userToUpdate.password,
        city: userToUpdate.city,
        road: userToUpdate.road,
        zipCode: userToUpdate.zipCode,
        numberHouse: userToUpdate.numberHouse,
        neighborhood: userToUpdate.neighborhood
      }),
      where: { cpf: userToUpdate.cpf }
    })
  })

  it('should get users', async () => {
    const { sut, prismaMock } = makeSut()

    const users: IUser[] = [
      {
        id: 1,
        createdAt: new Date(),
        cpf: '12345678901',
        name: 'Updated Name',
        email: 'updated@example.com',
        phone: '987654321',
        admin: true,
        office: 'Senior Developer',
        password: 'updatedpassword',
        city: 'Updated City',
        road: 'Updated Road',
        zipCode: '87654321',
        numberHouse: '321',
        neighborhood: 'Updated Neighborhood'
      },
      {
        id: 2,
        createdAt: new Date(),
        cpf: '12345678901',
        name: 'Updated Name',
        email: 'updated@example.com',
        phone: '987654321',
        admin: true,
        office: 'Senior Developer',
        password: 'updatedpassword',
        city: 'Updated City',
        road: 'Updated Road',
        zipCode: '87654321',
        numberHouse: '321',
        neighborhood: 'Updated Neighborhood'
      }
    ]

    // @ts-expect-error
    prismaMock.user.findMany.mockResolvedValue(users)

    const result = await sut.getUsers()

    expect(result).toEqual(users)
    expect(prismaMock.user.findMany).toHaveBeenCalledWith({})
  })

  it('should get user by cpf', async () => {
    const { sut, prismaMock } = makeSut()

    const userCpf = '12345678901'
    const userData: IUser = {
      id: 1,
      createdAt: new Date(),
      cpf: '12345678901',
      name: 'Updated Name',
      email: 'updated@example.com',
      phone: '987654321',
      admin: true,
      office: 'Senior Developer',
      password: 'updatedpassword',
      city: 'Updated City',
      road: 'Updated Road',
      zipCode: '87654321',
      numberHouse: '321',
      neighborhood: 'Updated Neighborhood'
    }

    // @ts-expect-error
    prismaMock.user.findUnique.mockResolvedValue(userData)

    const result = await sut.getUser('cpf', userCpf)

    expect(result).toEqual(userData)
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({ where: { cpf: userCpf } })
  })

  it('should return null when getting non-existing user by cpf', async () => {
    const { sut, prismaMock } = makeSut()

    const userCpf = '12345678901'

    // @ts-expect-error
    prismaMock.user.findUnique.mockResolvedValue(null)

    const result = await sut.getUser('cpf', userCpf)

    expect(result).toBeNull()
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({ where: { cpf: userCpf } })
  })

  it('should delete user', async () => {
    const { sut, prismaMock } = makeSut()

    const userId = 1
    const userData: IUser = {
      id: 1,
      createdAt: new Date(),
      cpf: '12345678901',
      name: 'Updated Name',
      email: 'updated@example.com',
      phone: '987654321',
      admin: true,
      office: 'Senior Developer',
      password: 'updatedpassword',
      city: 'Updated City',
      road: 'Updated Road',
      zipCode: '87654321',
      numberHouse: '321',
      neighborhood: 'Updated Neighborhood'
    }

    // @ts-expect-error
    prismaMock.user.findUnique.mockResolvedValue(userData)
    // @ts-expect-error
    prismaMock.user.delete.mockResolvedValue(userData)

    const result = await sut.deleteUser(userId)

    expect(result).toEqual(userData)
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({ where: { id: userId } })
    expect(prismaMock.user.delete).toHaveBeenCalledWith({ where: { id: userId } })
  })

  it('should throw error when deleting non-existing user', async () => {
    const { sut, prismaMock } = makeSut()

    const userId = 1

    // @ts-expect-error
    prismaMock.user.findUnique.mockResolvedValue(null)

    await expect(sut.deleteUser(userId)).rejects.toThrowError('[ENTITY- USER]: Usuário não encontrado')
  })

  it('should throw error when insert user without cpf', async () => {
    const { sut } = makeSut()

    const userCpf: any = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123456789',
      admin: false,
      office: 'Developer',
      password: 'password',
      city: 'City',
      road: 'Road',
      zipCode: '12345678',
      numberHouse: '123',
      neighborhood: 'Neighborhood'
    }

    await expect(sut.insertUser(userCpf)).rejects.toThrowError('[ENTITY- USER]: CPF Obrigatório')
  })

  it('should throw error when update user without cpf', async () => {
    const { sut } = makeSut()

    const userCpf: any = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123456789',
      admin: false,
      office: 'Developer',
      password: 'password',
      city: 'City',
      road: 'Road',
      zipCode: '12345678',
      numberHouse: '123',
      neighborhood: 'Neighborhood'
    }

    await expect(sut.updateUser(userCpf)).rejects.toThrowError('[ENTITY- USER]: CPF Obrigatório')
  })

  it('should throw error when insert user has registered', async () => {
    const { sut, prismaMock } = makeSut()

    const userCpf: Omit<IUser, 'id' | 'createdAt'> = {
      cpf: '12345678901',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123456789',
      admin: false,
      office: 'Developer',
      password: 'password',
      city: 'City',
      road: 'Road',
      zipCode: '12345678',
      numberHouse: '123',
      neighborhood: 'Neighborhood'
    }

    // @ts-expect-error
    prismaMock.user.findUnique.mockResolvedValue({})

    await expect(sut.insertUser(userCpf)).rejects.toThrowError('Usuário já cadastrado')
  })

  it('should throw error when update user has registered', async () => {
    const { sut, prismaMock } = makeSut()

    const userCpf: IUser = {
      id: 1,
      createdAt: new Date(),
      cpf: '12345678901',
      name: 'Updated Name',
      email: 'updated@example.com',
      phone: '987654321',
      admin: true,
      office: 'Senior Developer',
      password: 'updatedpassword',
      city: 'Updated City',
      road: 'Updated Road',
      zipCode: '87654321',
      numberHouse: '321',
      neighborhood: 'Updated Neighborhood'
    }

    // @ts-expect-error
    prismaMock.user.findUnique.mockResolvedValue(null)

    await expect(sut.updateUser(userCpf)).rejects.toThrowError('[ENTITY- USER]: Usuário não encontrado')
  })
})
