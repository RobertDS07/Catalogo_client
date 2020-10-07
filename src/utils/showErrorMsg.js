const showErrorFunction = (message) => {
    const error = document.querySelector('.errorMsg')
    error.innerHTML = message
    error.classList.add('show')

    setTimeout(() => {
        error.classList.remove('show')
        error.innerHTML = ''
    }, 4000)
}

export default showErrorFunction