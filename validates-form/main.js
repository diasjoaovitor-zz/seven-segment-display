class ValidatesForm {
  constructor() {
    this.form = document.querySelector('form') 
    this.submitForm()
    this.valid = true
  }

  submitForm() {
    this.form.addEventListener('submit', event => {
      event.preventDefault()
      this.isValid()
      if(this.isValid()) {
        alert('Formulário enviado.')
        this.form.submit();
      }
    })
  }

  isValid() {
    this.form.querySelectorAll('.error').forEach(error => error.remove())

    this.form.querySelectorAll('input').forEach(input => {
      this.inputIsValid(input)
    
      if(this.valid === true) {
        if(input.id == 'full-name')
          this.fullNameIsValid(input)

        if(input.id == 'cpf')
          this.cpfIsValid(input)

        if(input.id == 'user')
          this.userIsValid(input)

        if(input.id == 'password' || input.id == 'password-repeat') 
          this.passwordIsValid(input)
      }
    })

    return this.valid
  }

  inputIsValid(input) {
    this.valid = true

    if(!input.value) {
      this.createMsg(input, `<strong>${input.placeholder}</strong> não pode estar vazio!`)

      this.valid = false
    }
  }

  fullNameIsValid(input) {
    this.valid = true

    const fullName = document.getElementById('full-name').value

    if(fullName.length < 10) {
      this.createMsg(input, `<strong>${input.placeholder}</strong> tem ${fullName.length} caracteres, é preciso no mínimo 10`)

      this.valid = false
    }

    if(fullName.length > 40) {
      this.createMsg(input, `<strong>${input.placeholder}</strong> tem ${fullName.length}, o máximo é 40`)

      this.valid = false
    } 
  }

  cpfIsValid(input) {
    this.valid = true

    const cpf = document.getElementById('cpf').value

    const classCpf = new ValidatesCPF(cpf)

    if(!classCpf.validates()) {
      this.createMsg(input, `<strong>${input.placeholder}</strong>: ${cpf} inválido`)

      this.valid = false
    }  
  }

  userIsValid(input) {
    this.valid = true

    const user = document.getElementById('user').value

    if(user.length < 3) {
      this.createMsg(input, `<strong>${input.placeholder}</strong> tem ${user.length} caracteres, é preciso no mínimo 3`)

      this.valid = false
    }
      
    if(user.length > 12) {
      this.createMsg(input, `<strong>${input.placeholder}</strong> tem ${user.length} caracteres, o máximo é 12`)

      this.valid = false
    }
      
    if(!user.match(/^[a-zA-Z0-9]+$/g)) {
      this.createMsg(input, `<strong>${input.placeholder}</strong> precisa conter apenas letras e/ou números!`)

      this.valid = false
    } 
  }

  passwordIsValid(input) {
    this.valid = true

    const password = document.getElementById('password').value
    const passwordRepeat = document.getElementById('password-repeat').value

    if(password !== passwordRepeat && password.length >= 6 && password.length <= 12) {
      console.log('oi')
      this.createMsg(input, `<strong>${input.placeholder}</strong> os campos de senha devem ser iguais!`)

      this.valid = false
    }

    if(password.length < 6) {
      this.createMsg(input, `<strong>${input.placeholder}</strong> tem ${password.length} caracteres, o mínimo é 6`)

      this.valid = false
    }
      
    if(password.length > 12) {
      this.createMsg(input, `<strong>${input.placeholder}</strong> tem ${password.length} caracteres, o máximo é 12`)

      this.valid = false
    }   
  }

  createMsg(input, msgError) {
    const div = document.createElement('div')
    div.classList.add('error')
    div.innerHTML = msgError
    input.insertAdjacentElement('afterend', div)
  } 
}

new ValidatesForm()

