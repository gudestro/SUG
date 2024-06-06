import { isValidCPF } from './isValidCPF'

describe('isValidCPF', () => {
  it('should return true for a valid CPF', () => {
    const validCPF = '529.982.247-25'
    expect(isValidCPF(validCPF)).toBe(true)
  })

  it('should return false for an invalid CPF', () => {
    const invalidCPF = '123.456.789-00'
    expect(isValidCPF(invalidCPF)).toBe(false)
  })

  it('should return false for a CPF with all digits equal', () => {
    const allDigitsEqualCPF = '111.111.111-11'
    expect(isValidCPF(allDigitsEqualCPF)).toBe(false)
  })

  it('should return false for a string that is not a valid CPF', () => {
    const notValidCPF = 'not a CPF'
    expect(isValidCPF(notValidCPF)).toBe(false)
  })

  it('should return false for a CPF with incorrect length', () => {
    const invalidLengthCPF = '1234'
    expect(isValidCPF(invalidLengthCPF)).toBe(false)
  })

  it('should return false for an empty string', () => {
    const emptyCPF = ''
    expect(isValidCPF(emptyCPF)).toBe(false)
  })

  it('should return false for a null value', () => {
    const nullCPF = null
    expect(isValidCPF(nullCPF)).toBe(false)
  })

  it('should return false for an undefined value', () => {
    const undefinedCPF = undefined
    expect(isValidCPF(undefinedCPF)).toBe(false)
  })
})
