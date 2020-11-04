import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'

import Axios from 'axios'
import Nav from '../header/Nav'
import ScrollNav from '../header/ScollNav'
import Sort from '../header/Sort'
import NavResponsive from '../header/NavResponsive'
import Produtos from './Produtos'
import ProdutoSelecionado from './ProdutoSelecionado'
import Modal from '../adminComponents/Modal'
import requestProducts from '../../../utils/requestProducts'

import Loading from '../../utils/Loading'
import showErrorMsg from '../../../utils/showErrorMsg'

import debounce from '../../../utils/debounce'

export default ({ responsive, admin, setAdmin, storeName, storeInfo }) => {
    const [thisCategory, setThisCategory] = useState()
    const [produtos, setProdutos] = useState(null)
    const [sort, setSort] = useState()
    const [search, setSearch] = useState()
    const [deleted, setDeleted] = useState(false)
    const [created, setCreated] = useState(false)
    const [tipo, setTipo] = useState()

    useEffect(() => {
        if (!tipo || deleted || created) {
            ;(async () => {
                const res = await Axios.post(
                    process.env.REACT_APP_API ||
                        'http://localhost:8081/graphql',
                    {
                        query: `
                    {
                        getCategories(storeName:"${storeName}"){
                            category
                        }
                    }
                    `,
                    }
                )
                setTipo(res.data.data.getCategories)
            })()
        }

        ;(async () => {
            try {
                const res = await requestProducts(
                    undefined,
                    sort,
                    search,
                    thisCategory,
                    storeName
                )

                if (res.data.data.getProducts.products.length === 0) {
                    showErrorMsg('Nenhum item encontrado!', 'error')
                    return setProdutos(false)
                }

                setProdutos({
                    count: res.data.data.getProducts.count,
                    products: res.data.data.getProducts.products,
                })

                !!created && setCreated(false)
                !!deleted && setDeleted(false)
            } catch (e) {
                setProdutos(false)
                return showErrorMsg(e.response.data.errors[0].message, 'error')
            }
        })()
    }, [sort, thisCategory, search, deleted, created])

    function searchFunction(t) {
        if (!t) return setSearch(false)
        const text = t.trim().toLowerCase()
        if (text !== '' && text !== null && text !== undefined) {
            setSearch(text)
        }
    }

    const infiniteScroll = async () => {
        const wrapper = document.querySelector('.catchContent')

        if (!wrapper) return false

        const skip = wrapper.children.length

        if (skip === produtos.count) return false

        const res = await requestProducts(
            skip,
            sort,
            search,
            thisCategory,
            storeName
        )

        if (res.data.errors) return showErrorMsg(res.data.errors[0].message)

        setProdutos({
            count: res.data.data.getProducts.count,
            products: [
                ...produtos.products,
                ...res.data.data.getProducts.products,
            ],
        })
    }

    document.addEventListener('scroll', async () => {
        const allHeight = document.body.scrollHeight

        if (window.scrollY + window.innerHeight > allHeight - 100) {
            debounce(infiniteScroll, undefined, 750)
        }
    })

    return (
        <>
            {produtos === null && <Loading />}

            {!!admin && (
                <Modal
                    setAdmin={setAdmin}
                    setCreated={setCreated}
                    storeName={storeInfo.storeNameToLink}
                />
            )}

            {!responsive && (
                <>
                    <Nav>
                        <ScrollNav
                            setThisCategory={setThisCategory}
                            searchFunction={searchFunction}
                            storeName={storeName}
                            tipo={tipo}
                        />
                    </Nav>

                    <Sort setSort={setSort} />
                </>
            )}

            {responsive && (
                <NavResponsive
                    setThisCategory={setThisCategory}
                    tipo={tipo}
                    whats={storeInfo.whats}
                    whatsLink={storeInfo.whatsLinkToMsg}
                    insta={storeInfo.insta}
                    instaLink={storeInfo.instaLink}
                    searchFunction={searchFunction}
                    storeName={storeName}
                    setSort={setSort}
                />
            )}

            {!!produtos && (
                <>
                    <Route exact path={`/${storeName}`}>
                        <Produtos
                            produtos={produtos.products}
                            storeName={storeInfo.storeNameToLink}
                        />
                    </Route>

                    <Route path={`/${storeName}/category/:category`}>
                        <Produtos
                            produtos={produtos.products}
                            storeName={storeInfo.storeNameToLink}
                        />
                    </Route>

                    <Route
                        path={`/${storeName}/product/:id`}
                        component={(props) => (
                            <ProdutoSelecionado
                                id={props.match.params.id}
                                storeName={storeInfo.storeNameToLink}
                                admin={admin}
                                deleted={deleted}
                                setDeleted={setDeleted}
                            />
                        )}
                    />
                </>
            )}
        </>
    )
}
