import axios from 'axios'

const products = async (cursor, sort) => {
    const limit = window.innerWidth < 836 ? 10 : 20

    const res = !!cursor ? !sort ? await axios.post(process.env.API || 'http://localhost:8081/graphql', {
        query: `
            {
                products(limit:${limit}, cursor: "${cursor}") {
                    _id
                    fotourl
                    name
                    price
                    category
                }
            }
        `
    }) : await axios.post(process.env.API || 'http://localhost:8081/graphql', {
        query: `
            {
                products(limit:${limit}, cursor: "${cursor}", sort: ${sort}) {
                    _id
                    fotourl
                    name
                    price
                    category
                }
            }
        `
    }) : !sort ? await axios.post(process.env.API || 'http://localhost:8081/graphql', {
        query: `
            {
                products(limit:${limit}) {
                    _id
                    fotourl
                    name
                    price
                    category
                }
            }
        `
    }) : await axios.post(process.env.API || 'http://localhost:8081/graphql', {
        query: `
            {
                products(limit:${limit}, sort:${sort}) {
                    _id
                    fotourl
                    name
                    price
                    category
                }
            }
        `
    })
    return res
}

export default products