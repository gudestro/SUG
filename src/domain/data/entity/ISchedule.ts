export enum EStatus {
  active = 'active',
  inactive = 'inactive',
  canceled = 'canceled',
  suspended = 'suspended',
  finished = 'finished',
  pending = 'pending'
}

export interface ISchedule {
  id: number
  userId: number
  createdAt: Date
  updatedAt?: Date
  dateSchedule: Date
  allocationId: number
  constructionId: number
  status: string
  description?: string
}
