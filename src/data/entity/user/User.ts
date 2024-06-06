import { prismaClient } from '../../../infra/prisma/PrismaClient'
import { EncryptAdapter } from '../../../infra/cryptography/EncryptAdapter'
import { PrismaUserRepository } from '../../repository/user/UserRepository'
import { IUserRepository } from '../../../domain/data/repository/user/IUserRepository'
import { PrismaPermissionsUserRepository } from '../../repository/user/permissions/UserPermissionsRepository'
// import { IUser } from '../../../domain/data/entity/IUser'

export class User {
  private readonly _userRepository: IUserRepository
  private readonly _permissionsRepository: PrismaPermissionsUserRepository

  constructor (
    private _id?: number,
    private _cpf?: string,
    private _city?: string,
    private _road?: string,
    private _name?: string,
    private _phone?: string,
    private _admin?: boolean,
    private _office?: string,
    private _zipCode?: string,
    private _createdAt?: Date,
    private _updatedAt?: Date,
    private _password?: string,
    private _permissions?: any,
    private _numberHouse?: string,
    private _neighborhood?: string,
    private readonly _email?: string) {
    this._userRepository = new PrismaUserRepository(prismaClient.getClient())
    this._permissionsRepository = new PrismaPermissionsUserRepository(prismaClient.getClient())
  }

  // async addUser (): Promise<IUser> {
  // const isValid = this.validateAttributes()

  // if (!isValid) {
  //   return null
  // }

  // const save = this._userRepository.insertUser(user)

  //   return save
  // }

  async getUser (): Promise<void> {
    if (!this._email) {
      throw new Error('[USER] - Email not provided')
    }

    const result = await this._userRepository.getUser('email', this._email)

    if (result) {
      this._id = result.id
      this._cpf = result.cpf
      this._city = result.city
      this._road = result.road
      this._name = result.name
      this._phone = result.phone
      this._admin = result.admin
      this._office = result.office
      this._zipCode = result.zipCode
      this._password = result.password
      this._updatedAt = result.updatedAt
      this._createdAt = result.createdAt
      this._numberHouse = result.numberHouse
      this._neighborhood = result.neighborhood
      this._permissions = await this._permissionsRepository.getPermissionToUserByUserId(this._id)
    }
  }

  async comparePassword (passwordToCompare: string): Promise<boolean> {
    const salt = parseInt(process.env.SALT)
    const encryptAdapter = new EncryptAdapter(salt)

    if (!this._password && this._email) {
      await this.getUser()
    }

    if (!passwordToCompare) {
      return false
    }

    const isMatch = await encryptAdapter.compare(passwordToCompare, this._password)

    return isMatch
  }

  // private validateAttributes? (user: Omit<IUser, 'id'>): boolean {

  // }

  getId (): number {
    return this._id
  }

  getObjectUser (): any {
    return {
      id: this._id,
      cpf: this._cpf,
      city: this._city,
      road: this._road,
      name: this._name,
      email: this._email,
      phone: this._phone,
      admin: this._admin,
      office: this._office,
      zipCode: this._zipCode,
      password: this._password,
      updatedAt: this._updatedAt,
      createdAt: this._createdAt,
      permissions: this._permissions,
      numberHouse: this._numberHouse,
      neighborhood: this._neighborhood
    }
  }
}
