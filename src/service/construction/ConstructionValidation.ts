import { Validation } from '../../domain/utils/validator'
import { ValidationComposite } from '../../utils/validator-composite/validator-composite'
import { RequireFieldValidation } from '../../utils/validator-required-fields/validatorRequiredFields'
let validationComposite = null

export const makeConstructionValidation = (): Validation => {
  if (!validationComposite) {
    const validations: Validation[] = []
    for (const field of ['name', 'companyId', 'startDate', 'endDate']) {
      validations.push(new RequireFieldValidation(field))
    }
    validationComposite = new ValidationComposite(validations)
  }
  return validationComposite
}
