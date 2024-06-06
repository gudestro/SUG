export interface IUser {
  id: number
  cpf: string
  city: string
  road: string
  name: string
  email: string
  phone: string
  admin: boolean
  office: string
  zipCode: string
  updatedAt?: Date
  createdAt?: Date
  password: string
  numberHouse: string
  neighborhood: string
  categoryRules: number
}
