import { Validation } from '../../domain/utils/validator'
import { ValidationComposite } from '../../utils/validator-composite/validator-composite'
import { RequireFieldValidation } from '../../utils/validator-required-fields/validatorRequiredFields'

let validationComposite: ValidationComposite = null

export const makeAllocationValidation = (): Validation => {
  if (!validationComposite) {
    const validations: Validation[] = []
    for (const field of ['userId', 'constructionId']) {
      validations.push(new RequireFieldValidation(field))
    }
    validationComposite = new ValidationComposite(validations)
  }
  return validationComposite
}
