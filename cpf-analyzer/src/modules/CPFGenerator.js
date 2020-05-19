import CPFVerify from './CPFVerify'

export default class CPFGenerator {
  rand(min = 10000000000, max = 99999999999) {
    return String(Math.floor(Math.random() * (max - min + 1 )) + min)
  }

  format(cpf) {
    return cpf.slice(0, 3) + '.' + cpf.slice(3, 6) + '.' +cpf.slice(6, 9) + '-' + cpf.slice(9, 11)
  }

  validates() {
    const cpf = this.rand()
    const partialCPF = cpf.slice(0, -2)
    const firstDigit = CPFVerify.createDigits(partialCPF)
    const secondDigit = CPFVerify.createDigits(partialCPF + firstDigit)
    const validCPF = partialCPF + firstDigit + secondDigit

    return this.format(validCPF)
  }
}