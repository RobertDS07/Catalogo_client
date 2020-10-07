import axios from 'axios'

const products = async (skip, sort, search, category, data) => {
    const hd4k = window.innerWidth > 2000 ? true : false
    const limit = !hd4k ? window.innerWidth < 836 ? 10 : 20 : 30

    if (!skip) skip = 0
    if (!search) search = ''

    const res = !category ? !sort ? await axios.post(process.env.REACT_APP_API || 'http://localhost:8081/graphql', {
        query: `
            {
                products(limit:${limit}, skip:${skip}, search:"${search}") {
                    ${data}
                }
            }
        `
    }) : await axios.post(process.env.REACT_APP_API || 'http://localhost:8081/graphql', {
        query: `
            {
                products(limit:${limit}, sort:${sort}, skip:${skip}, search:"${search}") {
                    ${data}
                }
            }
        `
    }) : !sort ? await axios.post(process.env.REACT_APP_API || 'http://localhost:8081/graphql', {
        query: `
            {
                products(limit:${limit}, skip:${skip}, search:"${search}", category:"${category}") {
                    ${data}
                }
            }
        `
    }) : await axios.post(process.env.REACT_APP_API || 'http://localhost:8081/graphql', {
        query: `
            {
                products(limit:${limit}, sort:${sort}, skip:${skip}, search:"${search}", category: "${category}") {
                    ${data}
                }
            }
        `
    })
    return res
}

export default products