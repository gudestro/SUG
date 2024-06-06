import { PrismaClient } from '@prisma/client'
import { IConstruction } from '../../entity/IConstruction'

export interface IConstructionRepository {
  readonly _prismaClient: PrismaClient
  getConstructions (): Promise<IConstruction[]>
  deleteConstruction (constructionId: number): Promise<IConstruction>
  getConstruction (key: string, value: any): Promise<IConstruction | null>
  insertConstruction (constructionData: Omit<IConstruction, 'id'>): Promise<IConstruction>
  updateConstruction (constructionToUpdate: IConstruction): Promise<IConstruction>
}
