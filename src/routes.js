import React, { useState, useEffect } from 'react';
import {
    Route,
    Link,
} from "react-router-dom";
import axios from 'axios'

import Produtos from './components/Produtos'
import ProdutoSelecionado from './components/ProdutoSelecionado'
import Sort from './components/Sort'
import Nav from './components/Nav'
import A from './components/A'
import ScrollNav from './components/ScollNav'
import NavResponsive from './components/NavResponsive';

import Modal from './components/adminComponents/Modal'
import Admin from './components/adminComponents/Admin'

import whats from './assets/whats.png'
import logo from './assets/logo.png'
import arrowUp from './assets/arrowUp.png'

let sortLet = 'tipo'

export default function () {

    const [produtos, setProdutos] = useState()

    // pegando os itens para a raiz (todos os produtos)
    useEffect(() => {
        const getProdutos = async () => await axios.post('http://localhost:8081/', {
            sort: sortLet,
        })

        getProdutos().then(res => setProdutos(res.data))
    }, [sortLet])

    function sort(desc = 0, asc = 0, tipo = 0) {
        if (!!desc) {
            sortLet = { 'preço': 'desc' }
        }
        if (!!asc) {
            sortLet = { 'preço': 'asc' }
        }
        if (!!tipo) {
            sortLet = 'tipo'
        }
        window.localStorage.length === 0 ? setProdutos(null) : setProdutoAdmin(null)
    }

    const [tipo, setTipo] = React.useState()

    // pegando todos os tipos novamente para fazer usar na função validateProducts
    React.useEffect(() => {
        const dados = async () => await axios.get('http://localhost:8081/tipos')
        dados().then(res => setTipo(res.data))
    }, [])

    const [produtoAdmin, setProdutoAdmin] = useState()

    // pegando todos os produtos do Admin, é exatamente o que faz na parte da raiz do site, a diferença é que se o usuario tentar logar a rota de admin não ira carregar os produtos
    useEffect(() => {
        //enviando o token para autenticação de admin
        const token = localStorage.getItem('authorization')
        const getProdutos = async () => await axios.post('http://localhost:8081/admin/', {
            token: token,
            sort: sortLet
        })
        getProdutos().then(res => setProdutoAdmin(res.data))
    }, [sortLet])

    const [tipoAdmin, setTipoAdmin] = React.useState()

    // pegando todos os tipos novamente para fazer usar na função validateProducts, dessa vez para o admin
    React.useEffect(() => {
        const token = localStorage.getItem('authorization')
        const dados = async () => await axios.post('http://localhost:8081/admin/tipos', { token: token })
        dados().then(res => setTipoAdmin(res.data))
    }, [])

    // função citada, que serve para receber cada um dos produtos e organizar onde cada um deve ficar, tornando o processo de tipo/produtos muito mais simples e automatizado
    function validateProducts(product, requiredType) {
        //faz a comparação do tipo do produto e dos tipos pegos da linha 25
        if (window.localStorage.length === 0) {
            if (product.tipo === requiredType) {
                //  Aqui to pegando todos os produtos que passarem pela validação para poder usar para search do client, como explico algumas linhas mais para baixo 
                return (
                    <Link key={product._id} to={'/' + product._id}>
                        <div className='content'>
                            <img width='140' height='120' src={product.fotourl}></img>
                            <div className='container'>
                                <h3>{product.nome}</h3><br />
                                <h5>{product.preço}</h5>
                            </div>
                        </div>
                    </Link>
                )
            }
        }
        if (window.localStorage.length !== 0) {
            if (product.tipo === requiredType) {
                return (
                    <Link key={product._id} to={'/admin/produto/' + product._id}>
                        <div className='content'>
                            <img width='140' height='120' src={product.fotourl}></img>
                            <div className='container'>
                                <h3>{product.nome}</h3><br />
                                <h5>{product.preço}</h5>
                            </div>
                        </div>
                    </Link>
                )
            }
        }
    }

    // esse productsSearch serão os produtos que eu irei passar para dentro do componente quando houver um chamado de search
    const [productsSearch, setProductsSearch] = useState(false)
    // função feita para o search do usuario, onde ele da um .filtter nos produtos
    function searchFunction(text) {
        if (text !== '' && text !== null && text !== undefined) {
            setProductsSearch(produtos.filter(e => {
                if (e.nome.toLowerCase().includes(text.toLowerCase())) {
                    return e
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
            {!tipo && <h1>Loading...</h1>}

            <A link='https://www.instagram.com/direto__do__closet/' txt='@direto_do_closet' />

            {window.localStorage.length === 0 && window.innerWidth < 1400 &&
                <a className='whats' href='https://wa.me/5551989424940?text=Oii%20'>
                    <img src={whats} width='70' height='70' />
                </a>
            }

            {window.innerWidth > 1400 &&
                <img className='arrowUp' src={arrowUp} width='50' height='50' onClick={() => console.log(window.scrollTo(0, 0))} />
            }

            {window.localStorage.length !== 0 &&
                <Modal />
            }

            <img className='logo' src={logo} />

            {!responsive &&
                <>
                    <Nav>
                        {window.localStorage.length === 0 &&
                            <ScrollNav searchFunction={searchFunction} tipo={tipo} />
                        }
                        {window.localStorage.length !== 0 &&
                            <ScrollNav searchFunction={searchFunction} tipoAdmin={tipoAdmin} />
                        }
                    </Nav>

                    <Sort function={sort}></Sort>
                </>
            }

            {responsive && window.localStorage.length == 0 &&
                <NavResponsive tipo={tipo} searchFunction={searchFunction} sort={sort} />
            }
            {responsive && window.localStorage.length != 0 &&
                <NavResponsive tipoAdmin={tipoAdmin} searchFunction={searchFunction} sort={sort} />
            }

            {/* rota raiz da aplicação  */}
            <Route exact path="/">
                {!productsSearch && <Produtos produtos={produtos} />}
                {!!productsSearch && <Produtos search={productsSearch} />}
            </Route>

            {!!tipo && tipo.map(tipo =>
                //criando cada rota dinamicante com os tipos disponiveis no DB
                <Route key={tipo} path={'/' + tipo} >
                    {!productsSearch && <Produtos tipo={tipo} produtos={produtos} validateProducts={validateProducts} />}
                    {!!productsSearch && <Produtos tipo={tipo} search={productsSearch} validateProducts={validateProducts} />}
                </Route>
            )}

            {/* aqui é onde eu crio as rotas para cada produto dinamicamente, para quando forem clicados o cliente vir para essa rota e ver melhor cada descrição e etc... */}
            {!!produtos && produtos.map(e =>
                <Route key={e._id} path={'/' + e._id}>
                    <ProdutoSelecionado produtos={e} />
                </Route>
            )}

            {/* criando a rota do admin */}
            <Route exact path='/admin'>
                <Admin />
            </Route>

            {/* criando a rota do catalogo do admin, onde se a pessoa não estiver logada não conseguira ver  */}
            <Route exact path='/admin/catalogo'>
                {!produtoAdmin && <h1>Você não está autorizado</h1>}
                {!productsSearch && <Produtos produtosAdmin={produtoAdmin} />}
                {!!productsSearch && <Produtos searchAdmin={productsSearch} />}
                {/* <Produtos produtosAdmin={produtoAdmin} /> */}
            </Route>

            {!!tipoAdmin && tipoAdmin.map(tipo =>
                //criando cada rota dinamicante com os tipos disponiveis no DB para o admin
                <Route key={tipo} path={'/admin/catalogo/' + tipo}>
                    {!productsSearch && <Produtos produtoAdmin={produtoAdmin} tipoAdmin={tipo} validateProducts={validateProducts} />}
                    {!!productsSearch && <Produtos tipoAdmin={tipo} searchAdmin={productsSearch} validateProducts={validateProducts} />}
                </Route>
            )}

            {/* aqui é onde eu crio as rotas para cada produto dinamicamente, para quando forem clicados o cliente vir para essa rota e ver melhor cada descrição e etc... */}
            {!!produtoAdmin && produtoAdmin.map(e =>
                <Route key={e._id} path={'/admin/produto/' + e._id}>
                    <ProdutoSelecionado produtosAdmin={e} />
                </Route>
            )}

        </>
    )
}