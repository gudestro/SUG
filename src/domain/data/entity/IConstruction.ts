export interface IConstruction {
  id: number
  name: string
  companyId: number
  createdAt: Date
  updatedAt?: Date
  finishedAt?: Date
  status: string
  endDate: Date
  startDate: Date
}
