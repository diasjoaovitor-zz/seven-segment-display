import './css/style.css'

import CPFVerify from './modules/CPFVerify'
import CPFGenerator from './modules/CPFGenerator'

class Main {
  constructor() {
    this.input = document.querySelector('input')
    this.mask()
    this.render()
  }

  mask() {
    this.input.addEventListener('keyup', event => {
      event.preventDefault()

      if(this.input.value.length === 3 || this.input.value.length === 7) 
        this.input.value += '.'
      if(this.input.value.length === 11) 
        this.input.value += '-'
    })
  }

  verify() {
    const format = this.input.value.replace(/\D+/g, '')

    if(format.length !== 11 || format[0].repeat(11) == format)
      return false

    const cpfVerify = new CPFVerify(format)

    return cpfVerify.validates() 
  }

  generator() {
    const cpfGenerator = new CPFGenerator()

    return cpfGenerator.validates()
  }

  render() {
    document.addEventListener('click', event => {
      event.preventDefault()

      const result = document.querySelector('.result')

      if(event.target.id === 'verify') {
        if(this.verify())
          result.innerHTML = `CPF: ${this.input.value} Válido!`
        else  
          result.innerHTML = `CPF: ${this.input.value} Inválido!`
      } else if(event.target.id === 'generate') {
        this.input.value = this.generator()
        result.innerHTML = ''
      }
    })
  }
}

new Main()
