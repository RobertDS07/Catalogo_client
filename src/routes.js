import React, { useState, useEffect } from 'react';
import {
    Link,
    Redirect,
    Route,
    Switch
} from "react-router-dom";
import axios from 'axios'

import requestProducts from './utils/requestProducts'
import showErrorMsg from './utils/showErrorMsg'
import debounce from './utils/debounce';

import Produtos from './components/main/Produtos'
import ProdutoSelecionado from './components/main/ProdutoSelecionado'
import Sort from './components/header/Sort'
import Nav from './components/header/Nav'
import A from './components/header/A'
import ScrollNav from './components/header/ScollNav'
import NavResponsive from './components/header/NavResponsive';

import Loading from './components/utils/Loading'
import Error from './components/utils/ErrorMsg'

import Modal from './components/adminComponents/Modal'
import Admin from './components/adminComponents/Admin'

import whats from './assets/whats.png'
import logo from './assets/logo.png'
import arrowUp from './assets/arrowUp.png'

export default function () {
    const [responsive, setResponsive] = useState(false)
    const [sort, setSort] = useState()
    const [search, setSearch] = useState()
    const [category, setCategory] = useState()
    const [data, setData] = useState('_id name price fotourl')
    const [produtos, setProdutos] = useState([])
    const [tipo, setTipo] = useState()
    const [admin, setAdmin] = useState()
    const [deleted, setDeleted] = useState(false)
    const [created, setCreated] = useState(false)

    useEffect(() => {
        if (!!localStorage.getItem('authorization')) {
            (async () => {
                const res = await axios.post(process.env.REACT_APP_API || 'http://localhost:8081/graphql', {
                    query: `
                {
                    verifyToken(token:"${localStorage.getItem('authorization')}") {
                        admin
                    }
                }
                `
                })
                if (!res.data.data.verifyToken) return setAdmin(false)

                const { admin } = res.data.data.verifyToken

                if (admin) {
                    setAdmin(true)
                }
            })()
        } 

        if (!tipo || deleted || created) {
            (async () => {
                const res = await axios.post(process.env.REACT_APP_API || 'http://localhost:8081/graphql', {
                    query: `
                {
                    categories
                }
                `
                })
                setTipo(res.data.data.categories)
            })()
        }

        (async () => {
            try {
                const res = await requestProducts(undefined, sort, search, category, data)

                setProdutos(res.data.data.products)

                !!created && setCreated(false)
                !!deleted && setDeleted(false)
            } catch (e) {
                return showErrorMsg(e.response.data.errors[0].message)
            }
        })()
    }, [sort, admin, search, category, data, deleted, created])

    function searchFunction(t) {
        if (!t) return setSearch(false)
        const text = t.trim()
        if (text !== '' && text !== null && text !== undefined) {
            setSearch(text)
        }
    }

    const infiniteScroll = async () => {
        const wrapper = document.querySelector('.catchContent')

        if (!wrapper) return false

        const skip = wrapper.children.length

        const res = await requestProducts(skip, sort, search, category, data)

        if (!!res.data.errors) return showErrorMsg(res.data.errors[0].message)

        setProdutos([...produtos, ...res.data.data.products])
    }

    document.addEventListener('scroll', async () => {
        const allHeight = document.body.scrollHeight

        if (window.scrollY + window.innerHeight > allHeight - 100) {
            debounce(infiniteScroll, undefined, 750)
        }
    })

    window.addEventListener('load', () => window.innerWidth < 1400 ? setResponsive(false) : setResponsive(true))
    window.addEventListener('resize', () => window.innerWidth < 1400 ? setResponsive(false) : setResponsive(true))

    return (
        <>
            {!produtos && <Loading />}
            <A link='https://www.instagram.com/direto__do__closet/' txt='@direto_do_closet' />

            {!admin && window.innerWidth < 1400 &&
                <a className='whats' href='https://wa.me/5551989424940?text=Oii%20'>
                    <img src={whats} alt='51989424940' width='70' height='70' />
                </a>
            }

            {window.innerWidth > 1400 &&
                <img className='arrowUp' src={arrowUp} alt='Ir para o topo' width='50' height='50' onClick={() => window.scrollTo(0, 0)} />
            }

            {admin &&
                <Modal setAdmin={setAdmin} setCreated={setCreated} />
            }

            <Link to='/' className='logo'><img alt='Direto_Do_Closet' src={logo} /></Link>

            {!responsive &&
                <>
                    <Nav>
                        <ScrollNav searchFunction={searchFunction} tipo={tipo} setCategory={setCategory} />
                    </Nav>

                    <Sort setSort={setSort}></Sort>
                </>
            }

            {responsive &&
                <NavResponsive tipo={tipo} searchFunction={searchFunction} setSort={setSort} setCategory={setCategory} />
            }

            <Error />

            <Switch>
                <Route exact path="/">
                    {!!produtos && <Produtos produtos={produtos} />}
                </Route>

                {!!tipo && tipo.map(tipo =>
                    <Route key={tipo} path={'/' + tipo} >
                        <Produtos produtos={produtos} />
                    </Route>
                )}

                {!!produtos && produtos.map(e =>
                    <Route key={e._id} path={'/' + e._id}>
                        <ProdutoSelecionado _id={e._id} admin={admin} deleted={deleted} setDeleted={setDeleted} />
                    </Route>
                )}

                <Route exact path='/admin'>
                    {!!admin && <Redirect to='/' />}
                    <Admin setAdmin={setAdmin} />
                </Route>

                <Route path='*'>
                    <h1>Não existe</h1>
                </Route>
            </Switch>

            {responsive && <footer><a href='https://twitter.com/bugextreme1'>Desenvolvido por Robert Damaceno</a></footer>}
        </>
    )
}