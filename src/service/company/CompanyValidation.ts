import { Validation } from '../../domain/utils/validator'
import { ValidationComposite } from '../../utils/validator-composite/validator-composite'
import { RequireFieldValidation } from '../../utils/validator-required-fields/validatorRequiredFields'

let validationComposite: ValidationComposite = null

export const makeCompanyValidation = (): Validation => {
  if (!validationComposite) {
    const validations: Validation[] = []
    for (const field of ['cnpj', 'contact', 'nameCompany', 'nameResponsiblePerson', 'contactResponsiblePerson']) {
      validations.push(new RequireFieldValidation(field))
    }
    validationComposite = new ValidationComposite(validations)
  }

  return validationComposite
}
