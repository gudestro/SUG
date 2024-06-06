import { IUser } from '../../entity/IUser'
import { PrismaClient } from '@prisma/client'

export interface IUserRepository {
  readonly _prismaClient: PrismaClient
  getUsers (): Promise<IUser[]>
  deleteUser (id: number): Promise<IUser>
  updateUser (userToUpdate: IUser): Promise<IUser>
  insertUser (data: Omit<IUser, 'id'>): Promise<IUser>
  getUser (key: string, value: any): Promise<IUser>
}
