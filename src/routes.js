import React, { useState, useEffect } from 'react';
import {
    Route,
    Link,
    Redirect,
    Switch
} from "react-router-dom";
import axios from 'axios'

import requestProducts from './utils/requestProducts'
import showErrorMsg from './utils/showErrorMsg'

import Produtos from './components/Produtos'
import ProdutoSelecionado from './components/ProdutoSelecionado'
import Sort from './components/Sort'
import Nav from './components/Nav'
import A from './components/A'
import ScrollNav from './components/ScollNav'
import NavResponsive from './components/NavResponsive';
import Loading from './components/Loading'
import Error from './components/ErrorMsg'

import Modal from './components/adminComponents/Modal'
import Admin from './components/adminComponents/Admin'

import whats from './assets/whats.png'
import logo from './assets/logo.png'
import arrowUp from './assets/arrowUp.png'

export default function () {
    const [sort, setSort] = useState(false)
    // const [logged, setLogged] = useState(false)
    const [produtos, setProdutos] = useState(false)
    const [tipo, setTipo] = useState(false)

    const [admin, setAdmin] = useState(false)
    // const [produtoAdmin, setProdutoAdmin] = useState(false)

    useEffect(() => {
        if (!!localStorage.getItem('authorization')) {
            (async () => {
                const res = await axios.post(process.env.API || 'http://localhost:8081/graphql', {
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
                // setLogged(true)
            })()
        }

        if (!tipo) {
            (async () => {
                const res = await axios.post(process.env.API || 'http://localhost:8081/graphql', {
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
            const res = !sort ? await requestProducts() : await requestProducts(undefined, sort)

            if (!!res.data.errors) return showErrorMsg(res.data.errors[0].message)

            setProdutos(res.data.data.products)
        })()
    }, [sort, admin])

    function validateProducts(product, requiredType) {
    //     if (admin) {
    //         if (product.tipo === requiredType) {
    //             return (
    //                 <Link key={product._id} to={'/admin/produto/' + product._id}>
    //                     <div className='content'>
    //                         <img width='130' height='173' alt={product.nome} src={product.fotourl}></img>
    //                         <div className='container'>
    //                             <h3>{product.nome}</h3><br />
    //                             <h5>{product.preço}</h5>
    //                         </div>
    //                     </div>
    //                 </Link>
    //             )
    //         }
    //     }
    // }
    if (product.category === requiredType) {
        return (
            <Link key={product._id} to={'/' + product._id}>
                <div className='content'>
                    <img width='130' height='173' alt={product.nome} src={product.fotourl}></img>
                    <div className='container'>
                        <h3>{product.nome}</h3><br />
                        <h5>{product.preço}</h5>
                    </div>
                </div>
            </Link>
        )
    }
}

    const [productsSearch, setProductsSearch] = useState(false)
    function searchFunction(t) {
        let produtoToSearch = produtos
        // !logged ? produtoToSearch = produtos : produtoToSearch = produtoAdmin
        const text = t.trim()
        if (text !== '' && text !== null && text !== undefined) {
            setProductsSearch(produtoToSearch.filter(produto => {
                if (produto.name.toLowerCase().includes(text.toLowerCase())) {
                    return produto
                }
            }))
        } else {
            setProductsSearch(false)
        }
    }

    const [responsive, setResponsive] = useState(false)
    window.addEventListener('load', () => window.innerWidth < 1400 ? setResponsive(false) : setResponsive(true))
    window.addEventListener('resize', () => window.innerWidth < 1400 ? setResponsive(false) : setResponsive(true))

    return (
        <>
            {!tipo && <Loading />}
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
                <Modal setAdmin={setAdmin} />
            }

            <img className='logo' alt='Direto_Do_Closet' src={logo} />

            {!responsive &&
                <>
                    <Nav>
                        {!admin &&
                            <ScrollNav searchFunction={searchFunction} tipo={tipo} />
                        }
                        {admin &&
                            <ScrollNav searchFunction={searchFunction} tipo={tipo} />
                        }
                    </Nav>

                    <Sort setSort={setSort}></Sort>
                </>
            }

            {responsive && !admin &&
                <NavResponsive tipo={tipo} searchFunction={searchFunction} setSort={setSort} />
            }
            {responsive && admin &&
                <NavResponsive tipo={tipo} searchFunction={searchFunction} setSort={setSort} />
            }

            <Error />

            <Switch>
                <Route exact path="/">
                    {!productsSearch && !!produtos && <Produtos produtos={produtos} />}
                    {!!productsSearch && <Produtos search={productsSearch} />}
                </Route>

                {!!tipo && !admin && tipo.map(tipo =>
                    <Route key={tipo} path={'/' + tipo} >
                        {!productsSearch && <Produtos tipo={tipo} produtos={produtos} validateProducts={validateProducts} />}
                        {!!productsSearch && <Produtos tipo={tipo} search={productsSearch} validateProducts={validateProducts} />}
                    </Route>
                )}

                {!!produtos && produtos.map(e =>
                    <Route key={e._id} path={'/' + e._id}>
                        <ProdutoSelecionado produtos={e} />
                    </Route>
                )}

                <Route exact path='/admin'>
                    <Admin setAdmin={setAdmin} admin={admin} />
                </Route>

                {/* <Route exact path='/admin/catalogo'>
                    {!productsSearch && !!produtoAdmin && <Produtos produtosAdmin={produtoAdmin} />}
                    {!!productsSearch && <Produtos searchAdmin={productsSearch} />}
                    {!logged && window.localStorage === 0 && <Redirect to='/' />}
                </Route>

                {!!tipo && logged && tipo.map(tipo =>
                    <Route key={tipo} path={'/admin/catalogo/' + tipo}>
                        {!productsSearch && !!produtoAdmin && <Produtos produtoAdmin={produtoAdmin} tipoAdmin={tipo} validateProducts={validateProducts} />}
                        {!!productsSearch && <Produtos tipoAdmin={tipo} searchAdmin={productsSearch} validateProducts={validateProducts} />}
                        {!logged && window.localStorage === 0 && <Redirect to='/' />}
                    </Route>
                )}

                {!!produtoAdmin && logged && produtoAdmin.map(e =>
                    <Route key={e._id} path={'/admin/produto/' + e._id}>
                        <ProdutoSelecionado produtosAdmin={e} />
                        {!logged && window.localStorage === 0 && <Redirect to='/' />}
                    </Route>
                )} */}

                <Route path='*'>
                    <h1>Não existe</h1>
                </Route>
            </Switch>

            {responsive && <footer><a href='https://twitter.com/bugextreme1'>Desenvolvido por Robert Damaceno</a></footer>}
        </>
    )
}