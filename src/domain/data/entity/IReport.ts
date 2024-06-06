export interface IReport {
  id: number
  userId: number
  createdAt: Date
  scheduleId: number
  description: string
  constructionId: number
  isValided?: boolean
  typeReport?: string
}
