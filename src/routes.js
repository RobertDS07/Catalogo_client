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

import Produtos from './components/store/products/Produtos'
import Home from './components/home/Index'
import ProdutoSelecionado from './components/store/products/ProdutoSelecionado'
import Sort from './components/store/header/Sort'
import Nav from './components/store/header/Nav'
import ScrollNav from './components/store/header/ScollNav'
import NavResponsive from './components/store/header/NavResponsive';

import Loading from './components/utils/Loading'
import NotFound from './components/utils/NotFound404'

import Modal from './components/store/adminComponents/Modal'
import Admin from './components/store/adminComponents/Admin'

import whats from './assets/whats.png'
import arrowUp from './assets/arrowUp.png'
import Store from './components/store/Index.jsx';
import products from './utils/requestProducts';

export default function () {
    const [storeNamesToLink, setStoreNamesToLink] = useState()
    const [logged, setLogged] = useState()

    const [responsive, setResponsive] = useState(false)
    const [sort, setSort] = useState()
    const [search, setSearch] = useState()
    const [category, setCategory] = useState()
    const [produtos, setProdutos] = useState([])
    const [tipo, setTipo] = useState()
    const [admin, setAdmin] = useState()
    const [deleted, setDeleted] = useState(false)
    const [created, setCreated] = useState(false)

    useEffect(() => {
        // (async () => {
        //     try {
        //         const res = await axios.post(process.env.REACT_APP_API || 'http://localhost:8081/graphql', {
        //             query: `
        //         {
        //             storeNamesToLink{
        //                 storeNameToLink
        //             }
        //         }
        //         `
        //         })
        //         setStoreNamesToLink(res.data.data.storeNamesToLink)
        //     } catch (e) {
        //         return showErrorMsg(e.response.data.errors[0].message)
        //     }
        // })()

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
                if (!res.data.data.verifyToken) return setLogged(false)

                setLogged(true)
            })()
        } 
    }, [])

    return (
        <>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>

                <Route path='/:storeName' component={props => <Store storeName={props.match.params.storeName} match={props.match} logged={logged}/>} /> 

                <Route path='*'>
                    <NotFound />
                </Route>
            </Switch>

        </>
    )
}