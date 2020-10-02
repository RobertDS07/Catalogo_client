const showErrorFunction = (message) => {
    const error = document.querySelector('#errorMsg')
    error.children[0].innerHTML = message
    error.classList.add('show')

    setTimeout(() => {
        error.classList.remove('show')
        error.children[0].innerHTML = ''
    }, 4000)
}

export default showErrorFunction