const showErrorFunction = (message, errOrSucc) => {
    const error = document.querySelector('.message')
    error.innerHTML = message
    error.classList.add('show')
    error.classList.add(errOrSucc)
    const classes = error.classList
    const classesArry = Array.from(classes)

    const hasSucced = classesArry.includes('success')
    const hasError = classesArry.includes('error')

    setTimeout(() => {
        error.classList.remove('show')
        hasSucced && error.classList.remove('success')
        hasError && error.classList.remove('error')
        error.innerHTML = ''
    }, 4000)
}

export default showErrorFunction