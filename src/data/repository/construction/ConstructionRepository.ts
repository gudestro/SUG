import { PrismaClient } from '@prisma/client'
import { IConstruction } from '../../../domain/data/entity/IConstruction'
import { IConstructionRepository } from '../../../domain/data/repository/construction/IConstructionRepository'

export class PrismaConstructionRepository implements IConstructionRepository {
  constructor (readonly _prismaClient: PrismaClient) {}

  private map (object: any): IConstruction {
    const construction: IConstruction = {
      id: object.id,
      createdAt: new Date(object.createdAt),
      endDate: new Date(object.endDate),
      startDate: new Date(object.startDate),
      name: object.name,
      companyId: object.companyId,
      status: object.status
    }

    if (object.updatedAt) {
      construction.updatedAt = new Date(object.updatedAt)
    }

    if (object.finishedAt) {
      construction.finishedAt = new Date(object.finishedAt)
    }

    return construction
  }

  async insertConstruction (constructionData: Omit<IConstruction, 'id'>): Promise<IConstruction> {
    const construction = await this._prismaClient.construction.create({
      data: constructionData
    })

    const register = construction

    return this.map(register)
  }

  async updateConstruction (constructionToUpdate: IConstruction): Promise<IConstruction> {
    const { id, ...data } = constructionToUpdate

    const construction = await this._prismaClient.construction.update({
      data,
      where: { id }
    })

    const register = construction

    return this.map(register)
  }

  async getConstruction (key: string, value: any): Promise<IConstruction | null> {
    const search: any = {}
    search[key] = value
    const register = await this._prismaClient.construction.findUnique({
      where: search
    })

    return this.map(register)
  }

  async getConstructions (): Promise<IConstruction[]> {
    const register = await this._prismaClient.construction.findMany({
      orderBy: [
        {
          id: 'asc'
        }
      ]
    })
    return register.map(c => this.map(c))
  }

  async deleteConstruction (constructionId: number): Promise<IConstruction> {
    const construction = await this.getConstruction('id', constructionId)

    if (!construction) {
      throw new Error('[ENTITY - CONSTRUCTION]: Construção não encontrada')
    }

    await this._prismaClient.construction.delete({
      where: { id: constructionId }
    })

    return this.map(construction)
  }
}
