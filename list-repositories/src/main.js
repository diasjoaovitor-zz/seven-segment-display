import api from './api'

class Main {
    constructor() {
        this.listRepositories = JSON.parse(localStorage.getItem('listRepositories')) || []

        this.form = document.querySelector('form')
        this.input = document.querySelector('input')
        this.ul = document.querySelector('ul')

        this.registerHandlers()
        this.render()
    }

    registerHandlers() {
        this.form.onsubmit = event => this.addRepository(event)
    }

    setLoading(loading = true) {
        if(loading === true) {
            let loadingAnimation = document.createElement('span')
            loadingAnimation.appendChild(document.createTextNode('carregando...'))
            loadingAnimation.setAttribute('id', 'loading')

            this.form.appendChild(loadingAnimation)
        } else 
            document.getElementById('loading').remove()
    }

    async addRepository(event) {
        event.preventDefault()

        const inputValue = this.input.value

        if(inputValue.length === 0)
            return
        
        this.setLoading() 

        try {
            const response = await api.get(inputValue)
            console.log(response)

            const {name, description, html_url, owner: {avatar_url}} = response.data

            this.listRepositories.push({name, description, avatar_url, html_url})

            this.input.value = ''
            this.input.focus()
        } catch(err) {
            alert('This repositorie does not exist')
        }

        this.render()

        this.saveToStorage()

        this.setLoading(false)
    }

    removeRepositories(pos) {
        this.listRepositories.splice(pos, 1)
        this.render()
        this.saveToStorage()
    }

    render() {
        this.ul.innerHTML = ''

        this.listRepositories.forEach(repository => {
            let li = document.createElement('li')

            let div = document.createElement('div')

            let img = document.createElement('img')
            img.setAttribute('src', repository.avatar_url)

            let h2 = document.createElement('h2')
            h2.appendChild(document.createTextNode(repository.name))

            let p = document.createElement('p')
            p.appendChild(document.createTextNode(repository.description))

            let accessRepository = document.createElement('a')
            accessRepository.setAttribute('target', '_blank')
            accessRepository.setAttribute('href', repository.html_url)
            accessRepository.appendChild(document.createTextNode('acessar'))

            let removeRepository = document.createElement('a')
            removeRepository.setAttribute('href', '#')
            removeRepository.classList.add('remove')

            let pos = this.listRepositories.indexOf(repository)

            removeRepository.addEventListener('click', event => {
                if(event.target.classList.contains('remove')) 
                    this.removeRepositories(pos)
            })

            removeRepository.appendChild(document.createTextNode('remover'))

            div.appendChild(h2)
            div.appendChild(p)
            div.appendChild(accessRepository)
            div.appendChild(removeRepository)

            li.appendChild(img)
            li.appendChild(div)

            this.ul.appendChild(li)
        })
    }

    saveToStorage() {
        localStorage.setItem('listRepositories', JSON.stringify(this.listRepositories))
    }
}

new Main()
