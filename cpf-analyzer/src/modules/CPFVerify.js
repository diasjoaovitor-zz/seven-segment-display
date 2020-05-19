export default class CPFAnalyzer {
  constructor(cpf) {
    this.cpf = cpf
  }

  validates() {
    const partialCPF =  this.cpf.slice(0, -2)
    const firstDigit = CPFAnalyzer.createDigits(partialCPF)
    const secondDigit = CPFAnalyzer.createDigits(partialCPF + firstDigit)
    const validCPF = partialCPF + firstDigit + secondDigit

    return validCPF === this.cpf
  }

  static createDigits(partialCPF) {
    const array = Array.from(partialCPF)
    let factorial = partialCPF.length + 1
    let sumDigits = array.reduce((total, value) => {
      total += value*factorial
      factorial--
      return total
    }, 0)

    const digit = 11 - (sumDigits % 11)

    return digit > 9 ? '0' : String(digit)
  }
}
