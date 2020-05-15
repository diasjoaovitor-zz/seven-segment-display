class ValidatesCPF {
  constructor(cpfValue) {
    Object.defineProperty(this, 'formatCPF', {
      value: cpfValue.replace(/\D+/g, '')
    })
  }

  validates() {
    if(typeof this.formatCPF !== 'string')
      return false
    if(this.formatCPF.length !== 11)
      return false
    if(this.isSequence())
      return false

    const partialCPF = this.formatCPF.slice(0, -2)
    const firstDigit = this.createDigit(partialCPF)
    const secondDigit = this.createDigit(partialCPF + firstDigit)

    const cpfIsValid = partialCPF + firstDigit + secondDigit

    return cpfIsValid === this.formatCPF
  }

  createDigit(partialCPF) {
    const cpfArray = Array.from(partialCPF)
    let regressiveCounter = cpfArray.length + 1

    const sumDigits = cpfArray.reduce((total, value) => {
      total += regressiveCounter * value
      regressiveCounter--
      return total
    }, 0)

    const digit = 11 - (sumDigits % 11)

    return digit > 9 ? '0' : String(digit)
  }

  isSequence() {
    return this.formatCPF[0].repeat(this.formatCPF.length) === this.formatCPF
  }
}

