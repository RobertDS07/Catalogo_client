import axios from 'axios'

const products = async (skip, sort, search, category, storeName) => {
    const hd4k = window.innerWidth > 2000
    const limit = !hd4k ? (window.innerWidth < 836 ? 10 : 20) : 30

    if (!skip) skip = 0
    if (!search) search = ''

    const res = !category
        ? !sort
            ? await axios.post(
                  process.env.REACT_APP_API || 'http://localhost:8081/graphql',
                  {
                      query: `
            {
                getProducts(storeName:"${storeName}", limit:${limit}, offset:${skip}, search:"${search}") {
                    count
                    products{
                        id
                        name
                        price
                        fotourl
                    }
                }
            }
        `,
                  }
              )
            : await axios.post(
                  process.env.REACT_APP_API || 'http://localhost:8081/graphql',
                  {
                      query: `
            {
                getProducts(storeName:"${storeName}", limit:${limit}, sort:"${sort}", offset:${skip}, search:"${search}") {
                    count
                    products{
                        id
                        name
                        price
                        fotourl
                    }
                }
            }
        `,
                  }
              )
        : !sort
        ? await axios.post(
              process.env.REACT_APP_API || 'http://localhost:8081/graphql',
              {
                  query: `
            {
                getProducts(storeName:"${storeName}", limit:${limit}, offset:${skip}, search:"${search}", category:"${category}") {
                    count
                    products{
                        id
                        name
                        price
                        fotourl
                    }
                }
            }
        `,
              }
          )
        : await axios.post(
              process.env.REACT_APP_API || 'http://localhost:8081/graphql',
              {
                  query: `
            {
                getProducts(storeName:"${storeName}", limit:${limit}, sort:"${sort}", offset:${skip}, search:"${search}", category: "${category}") {
                    count
                    products{
                        id
                        name
                        price
                        fotourl
                    }
                }
            }
        `,
              }
          )
    return res
}

export default products
