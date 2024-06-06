import { PrismaClient } from '@prisma/client'
import { IAllocation } from '../../../domain/data/entity/IAllocation'
import { IAllocationRepository } from '../../../domain/data/repository/allocation/IAllocationRepository'

export class PrismaAllocationRepository implements IAllocationRepository {
  constructor (readonly _prismaClient: PrismaClient) {}

  private map (object: any): IAllocation {
    const allocation: IAllocation = {
      id: object.id,
      userId: object.userId,
      createdAt: new Date(object.createdAt),
      constructionId: object.constructionId,
      status: object.status
    }

    if (object.updatedAt) {
      allocation.updatedAt = new Date(object.updatedAt)
    }

    return allocation
  }

  async insertAllocation (allocationData: Omit<IAllocation, 'id'>): Promise<IAllocation> {
    const allocation = await this._prismaClient.allocation.create({
      data: allocationData
    })

    return this.map(allocation)
  }

  async updateAllocation (allocationToUpdate: IAllocation): Promise<IAllocation> {
    const { id, ...data } = allocationToUpdate

    const allocation = await this._prismaClient.allocation.update({
      data,
      where: { id }
    })

    return this.map(allocation)
  }

  async getAllocation (allocationId: number): Promise<IAllocation | null> {
    const result = await this._prismaClient.allocation.findUnique({
      where: { id: allocationId }
    })

    return this.map(result)
  }

  async getAllocations (): Promise<IAllocation[] | null> {
    const result = await this._prismaClient.allocation.findMany({
      orderBy: [
        {
          id: 'asc'
        }
      ]
    })

    return result.map(r => this.map(r))
  }

  async getAllocationByUserId (userId: number): Promise<IAllocation[]> {
    const result = await this._prismaClient.allocation.findMany({
      where: { userId },
      orderBy: [
        {
          id: 'asc'
        }
      ]
    })
    return result.map(r => this.map(r))
  }

  async getAllocationByConstructionId (constructionId: number): Promise<IAllocation[]> {
    const result = await this._prismaClient.allocation.findMany({
      where: { constructionId },
      orderBy: [
        {
          id: 'asc'
        }
      ]
    })
    return result.map(r => this.map(r))
  }

  async deleteAllocation (allocationId: number): Promise<IAllocation> {
    const allocation = await this.getAllocation(allocationId)

    if (!allocation) {
      throw new Error('[ENTITY - ALLOCATION]: Alocação não encontrada')
    }

    await this._prismaClient.allocation.delete({
      where: { id: allocationId }
    })

    return this.map(allocation)
  }
}
