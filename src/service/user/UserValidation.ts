import { Validation } from '../../domain/utils/validator'
import { ValidationComposite } from '../../utils/validator-composite/validator-composite'
import { RequireFieldValidation } from '../../utils/validator-required-fields/validatorRequiredFields'

export const makeUserValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['cpf', 'city', 'road', 'name', 'email', 'phone', 'office', 'zipCode', 'password', 'numberHouse', 'neighborhood']) {
    validations.push(new RequireFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
