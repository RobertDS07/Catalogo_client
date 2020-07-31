import React, { useState, useEffect } from 'react';
import {
    Route,
    Link,
} from "react-router-dom";
import axios from 'axios'

import Produtos from './components/Produtos'
import ProdutoSelecionado from './components/ProdutoSelecionado'

import Admin from './components/adminComponents/Admin'
import ProdutosAdmin from './components/adminComponents/ProdutosAdmin'

export default function (Routes) {

    const [produtos, setProdutos] = useState()

    useEffect(() => {
        const getProdutos = async () => axios.get('http://localhost:8081/')

        getProdutos().then(res => setProdutos(res.data))
    }, [])

    const [tipo, setTipo] = React.useState()

    React.useEffect(() => {
        const dados = async () => await axios.get('http://localhost:8081/tipos')
        dados().then(res => setTipo(res.data))
    }, [])

    const [produtoAdmin, setProdutoAdmin] = useState()

    useEffect(() => {
        const token = localStorage.getItem('authorization')
        const getProdutos = async () => await axios.post('http://localhost:8081/admin/', {token: token})

        getProdutos().then(res => setProdutoAdmin(res.data))
    }, [])

    function validateProducts(product, requiredType) {
        if (product.tipo == requiredType.tipo) {
            return (
                <Link key={product._id} to={'/' + product._id}>
                    <div>
                        <img width='140' height='120' src={product.fotourl}></img>
                        <div className='container'>
                            <h3>{product.nome}</h3>
                            <h5>{product.preço}</h5>
                        </div>
                    </div>
                </Link>
            )
        }
    }

    return (
        <>
            {!tipo && <h1>Loading...</h1>}

            <Route exact path="/">
                <Produtos>
                    {!!produtos && produtos.map(e =>
                        <Link key={e._id} to={'/' + e._id}>
                            <div>
                                <img width='140' height='120' src={e.fotourl}></img>
                                <div className='container'>
                                    <h3>{e.nome}</h3>
                                    <h5>{e.preço}</h5>
                                </div>
                            </div>
                        </Link>
                    )}
                </Produtos>
            </Route>

            {!!tipo && tipo.map(tipo =>
                <Route key={tipo} path={'/' + tipo}>
                    <Produtos>
                        {!produtos && <h1>Loading...</h1>}
                        {!!produtos && produtos.map(e => validateProducts(e, { tipo }))}
                    </Produtos>
                </Route>
            )}

            {!!produtos && produtos.map(e =>
                <Route key={e._id} path={'/' + e._id}>
                    <ProdutoSelecionado>
                        <img src={e.fotourl} width='200' height='160'></img>
                        <div>
                            <h2>{e.nome}</h2>
                            <h3 className='margin-top'>{e.descriçao}</h3>
                            <p className='margin-top'>{e.tamanho}</p>
                            <p className='p'>{e.preço}</p>
                        </div>
                    </ProdutoSelecionado>
                </Route>
            )}

            <Route exact path='/admin'>
                <Admin />
            </Route>

            <Route path='/admin/catalogo'>
                {!produtoAdmin && <h1>Você não está autorizado</h1>}
                <ProdutosAdmin>
                    {!!produtoAdmin && produtoAdmin.map(e =>
                        <Link key={e._id} to={'/' + e._id}>
                            <div>
                                <img width='140' height='120' src={e.fotourl}></img>
                                <div className='container'>
                                    <h3>{e.nome}</h3>
                                    <h5>{e.preço}</h5>
                                </div>
                            </div>
                        </Link>
                    )}
                </ProdutosAdmin>
            </Route>
        </>
    )
}