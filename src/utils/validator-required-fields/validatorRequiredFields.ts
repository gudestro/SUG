import { Validation } from '../../domain/utils/validator'

export class RequireFieldValidation implements Validation {
  private readonly field: string
  constructor (field: string) {
    this.field = field
  }

  validate (input: any): Error {
    if (!input[this.field]) return new Error(`No ${this.field} provided.`)
  }
}
