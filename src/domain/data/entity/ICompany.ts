export interface ICompany {
  id: number
  cnpj: string
  contact: string
  createdAt: Date
  updatedAt?: Date
  nameCompany: string
  nameResponsiblePerson: string
  contactResponsiblePerson: string
}
