export interface IAllocation {
  id: number
  userId: number
  constructionId: number
  status: string
  createdAt: Date
  updatedAt?: Date
}
