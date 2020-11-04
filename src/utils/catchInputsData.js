const CatchInputsData = (e) => {
    const formTarget = e.target

    const data = {}

    for (let i = 0; i < formTarget.children.length; i++) {
        if (
            formTarget.children[i].name !== '' &&
            formTarget.children[i].name !== undefined &&
            formTarget.children[i].value !== '' &&
            formTarget.children[i].value !== undefined
        ) {
            data[formTarget.children[i].name] = formTarget.children[i].value
        }
    }

    return data
}

export default CatchInputsData
