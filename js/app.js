console.log('js')

const randomEmailAPI = 'https://flynn.boolean.careers/exercises/api/random/mail'
const list_container = document.getElementById('list_container')

function getEmail() {
    return axios.get('https://flynn.boolean.careers/exercises/api/random/mail')
}

function createPromises() {
    const promises = []
    for (let i = 0; i < 10; i++) {
        promises.push(getEmail())
    }
    return promises
}

function getEmails() {
    const docFragment = document.createDocumentFragment()
    const promises = createPromises()
    Promise.allSettled(promises).then((value) => {
        value.forEach((el) => {
            let newElement

            if (el.status === 'fulfilled') {
                const currentEmail = el.value.data.response
                newElement = createElement('li', currentEmail)
            } else {
                newElement = createElement('li', 'Failed to load Email')
            }

            docFragment.appendChild(newElement)
        })

        list_container.append(docFragment)
    })

    // Se metto l'append del docFragment QUI non funziona?!
}

function createElement(type = 'div', content = '', classes = []) {
    const newElement = document.createElement(type)
    newElement.textContent = content
    classes.forEach((value) => {
        newElement.classList.add(value)
    })

    return newElement
}

getEmails()
