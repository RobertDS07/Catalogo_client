import React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import A from './header/A'

import Modal from './adminComponents/Modal'
import requestProducts from '../../utils/requestProducts'
import Axios from 'axios'
import showErrorMsg from '../../utils/showErrorMsg'
import Loading from '../utils/Loading'

import debounce from '../../utils/debounce';
import whats from '../../assets/whats.png'
import arrowUp from '../../assets/arrowUp.png'
import { Link, Redirect, Route } from 'react-router-dom'
import NotFound404 from '../utils/NotFound404'
import Nav from './header/Nav'
import ScrollNav from './header/ScollNav'
import Sort from './header/Sort'
import NavResponsive from './header/NavResponsive'
import Produtos from './products/Produtos'
import ProdutoSelecionado from './products/ProdutoSelecionado'
import Admin from './adminComponents/Admin'


const Store = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

@media (min-width: 1400px) {
  width: auto;
  min-height: 100vh;
  position: relative;
  display: grid;
  grid-template-rows: 75px 1fr 20px;
  grid-template-columns: 0.3fr 270px 1fr 0.3fr;
  grid-template-areas: 
  "cabeçalho cabeçalho cabeçalho cabeçalho"
  "nothing nav main morenothing"
  "footer footer footer footer ";
}
`

export default ({ storeName, match }) => {
    const [thisCategory, setThisCategory] = useState()
    const [storeInfo, setStoreInfo] = useState()
    const [produtos, setProdutos] = useState()
    const [sort, setSort] = useState()
    const [search, setSearch] = useState()
    const [deleted, setDeleted] = useState(false)
    const [created, setCreated] = useState(false)
    const [admin, setAdmin] = useState()
    const [responsive, setResponsive] = useState(window.innerWidth < 1400 ? false : true)
    const [tipo, setTipo] = useState()

    useEffect(() => {
        if (!storeInfo) {
            (async () => {
                try {
                    const res = await Axios.post(process.env.REACT_APP_API || 'http://localhost:8081/graphql', {
                        query: `
                    {
                        storeInfo(storeName:"${storeName}"){
                            storeNameToLink
                            logoLink
                            instaLink
                            insta
                            whats
                            whatsLinkToMsg
                        }
                    }
                    `
                    })
                    setStoreInfo({ ...res.data.data.storeInfo })
                } catch (e) {
                    if (!!e.response) return showErrorMsg(e.response.data.errors[0].message)
                }
            })()
        }
        if (!!localStorage.getItem('authorization')) {
            (async () => {
                const res = await Axios.post(process.env.REACT_APP_API || 'http://localhost:8081/graphql', {
                    query: `
                    {
                        verifyToken(token:"${localStorage.getItem('authorization')}" storeName:"${storeName}") {
                            admin
                        }
                    }
                    `
                })
                if (!res.data.data.verifyToken) return setAdmin(false)

                const admin = res.data.data.verifyToken.admin

                if (!admin) return setAdmin(false)

                return setAdmin(true)
            })()
        }

        if (!tipo || deleted || created) {
            (async () => {
                const res = await Axios.post(process.env.REACT_APP_API || 'http://localhost:8081/graphql', {
                    query: `
                    {
                        getCategories(storeName:"${storeName}"){
                            category
                        }
                    }
                    `
                })
                setTipo(res.data.data.getCategories)
            })()
        }

        (async () => {
            try {
                const res = await requestProducts(undefined, sort, search, thisCategory, storeName)

                if (res.data.data.getProducts.products.length === 0) return showErrorMsg('Nenhum item encontrado!', 'error')

                setProdutos({ count: res.data.data.getProducts.count, products: res.data.data.getProducts.products })

                !!created && setCreated(false)
                !!deleted && setDeleted(false)
            } catch (e) {
                return showErrorMsg(e.response.data.errors[0].message, 'error')
            }
        })()
    }, [sort, admin, thisCategory, search, deleted, created])

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

        const res = await requestProducts(skip, sort, search, thisCategory, storeName)

        if (!!res.data.errors) return showErrorMsg(res.data.errors[0].message)

        setProdutos({ count: res.data.data.getProducts.count, products: [...produtos.products, ...res.data.data.getProducts.products] })
    }

    document.addEventListener('scroll', async () => {
        const allHeight = document.body.scrollHeight

        if (window.scrollY + window.innerHeight > allHeight - 100) {
            debounce(infiniteScroll, undefined, 750)
        }
    })

    window.addEventListener('resize', () => window.innerWidth < 1400 ? setResponsive(false) : setResponsive(true))

    return (
        <Store>
            {!produtos && <NotFound404 />}
            {!!produtos && produtos.products.length === 0 && <Loading />}
            {!!storeInfo &&
                <>
                    <A link={storeInfo.instaLink} txt={storeInfo.insta} />

                    {!admin && window.innerWidth < 1400 &&
                        <a className='whats' href={storeInfo.whatsLinkToMsg}>
                            <img src={whats} alt={storeInfo.whats} width='70' height='70' />
                        </a>
                    }
                    {window.innerWidth > 1400 &&
                        <img className='arrowUp' src={arrowUp} alt='Ir para o topo' width='50' height='50' onClick={() => window.scrollTo(0, 0)} />
                    }

                    {admin &&
                        <Modal setAdmin={setAdmin} setCreated={setCreated} />
                    }
                    <Link to={`/${storeName}`} style={{ zIndex: 2 }} className='logo'><img alt={storeInfo.insta} src={storeInfo.logoLink} /></Link>

                    {!responsive &&
                        <>
                            <Nav>
                                <ScrollNav setThisCategory={setThisCategory} searchFunction={searchFunction} storeName={storeName} tipo={tipo} />
                            </Nav>

                            <Sort setSort={setSort}></Sort>
                        </>
                    }

                    {responsive &&
                        <NavResponsive setThisCategory={setThisCategory} tipo={tipo} whats={storeInfo.whats} whatsLink={storeInfo.whatsLinkToMsg} insta={storeInfo.insta} instaLink={storeInfo.instaLink} searchFunction={searchFunction} storeName={storeName} setSort={setSort} />
                    }

                    {!!produtos &&
                        <>
                            <Route exact path={match.url} component={() => <Produtos produtos={produtos.products} storeName={storeInfo.storeNameToLink} />} />
                            <Route path={`${match.url}/category/:category`} component={() => <Produtos produtos={produtos.products} storeName={storeInfo.storeNameToLink} />} />
                            <Route path={`${match.url}/product/:id`} component={props => <ProdutoSelecionado id={props.match.params.id} storeName={storeInfo.storeNameToLink} admin={admin} deleted={deleted} setDeleted={setDeleted} />} />
                            <Route path={`${match.url}/admin`}>
                                {!!admin && <Redirect to={`${match.url}`} />}
                                <Admin setAdmin={setAdmin} />
                            </Route>
                        </>
                    }

                    {responsive && <footer><a href='https://twitter.com/bugextreme1'>Desenvolvido por Robert Damaceno</a></footer>}
                </>
            }

        </Store>
    )
}