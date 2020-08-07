import React, { useState, useEffect } from 'react';
import {
    Route,
    Link,
} from "react-router-dom";
import axios from 'axios'

import Produtos from './components/Produtos'
import ProdutoSelecionado from './components/ProdutoSelecionado'
import Sort from './components/Sort'

import Admin from './components/adminComponents/Admin'

let sortLet = 'tipo'

export default function (Routes) {

    const [produtos, setProdutos] = useState()

    // pegando os itens para a raiz (todos os produtos)
    useEffect(() => {
        const getProdutos = async () => await axios.post('http://localhost:8081/', {
            sort: sortLet
        })
        getProdutos().then(res => setProdutos(res.data))
    }, [produtos])

    function sort(desc=0, asc=0, tipo=0){
        if(!!desc){
            sortLet = {preço: 'DESC'}
        }
        if(!!asc){
            sortLet = {preço: 'asc'}
        }
        if(!!tipo){
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
    }, [produtoAdmin])

    const [tipoAdmin, setTipoAdmin] = React.useState()

    // pegando todos os tipos novamente para fazer usar na função validateProducts, dessa vez para o admin
    React.useEffect(() => {
        const token = localStorage.getItem('authorization')
        const dados = async () => await axios.post('http://localhost:8081/admin/tipos', { token: token })
        dados().then(res => setTipoAdmin(res.data))
    }, [])

    // função sitada a cima, ela serve para receber cada um dos produtos e organizar onde cada um deve ficar, tornando o processo de tipo/produtos muito mais simples e automatizado
    function validateProducts(product, requiredType) {
        //faz a comparação do tipo do produto e dos tipos pegos da linha 25
        if (window.localStorage.length === 0) {
            if (product.tipo === requiredType.tipo) {
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
        if (window.localStorage.length !== 0) {
            if (product.tipo === requiredType.tipo) {
                return (
                    <Link key={product._id} to={'/admin/produto/' + product._id}>
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
    }

    return (
        <>
            {!tipo && <h1>Loading...</h1>}

            <Sort function={sort}></Sort>

            {/* rota raiz da aplicação  */}
            <Route exact path="/">
                <Produtos produtos={produtos}/>
            </Route>

            {!!tipo && tipo.map(tipo =>
                //criando cada rota dinamicante com os tipos disponiveis no DB
                <Route key={tipo} path={'/' + tipo}>
                    <Produtos>
                        {/* enviando os produtos e o tipo para a função lá de cima para ela organizar tudo certinho  */}
                        {!!produtos && produtos.map(e => validateProducts(e, { tipo }))}
                    </Produtos>
                </Route>
            )}

            {/* aqui é onde eu crio as rotas para cada produto dinamicamente, para quando forem clicados o cliente vir para essa rota e ver melhor cada descrição e etc... */}
            {!!produtos && produtos.map(e =>
                <Route key={e._id} path={'/' + e._id}>
                    <ProdutoSelecionado produtos={e}>
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

            {/* criando a rota do admin */}
            <Route exact path='/admin'>
                <Admin />
            </Route>

            {/* criando a rota do catalogo do admin, onde se a pessoa não estiver logada não conseguira ver  */}
            <Route exact path='/admin/catalogo'>
                {!produtoAdmin && <h1>Você não está autorizado</h1>}
                <Produtos produtosAdmin={produtoAdmin}/>
            </Route>

            {!!tipoAdmin && tipoAdmin.map(tipo =>
                //criando cada rota dinamicante com os tipos disponiveis no DB para o admin
                <Route key={tipo} path={'/admin/catalogo/' + tipo}>
                    <Produtos>
                        {/* enviando os produtos e o tipo para a função lá de cima para ela organizar tudo certinho  */}
                        {!!produtoAdmin && produtoAdmin.map(e => validateProducts(e, { tipo }))}
                    </Produtos>
                </Route>
            )}

            {/* aqui é onde eu crio as rotas para cada produto dinamicamente, para quando forem clicados o cliente vir para essa rota e ver melhor cada descrição e etc... */}
            {!!produtoAdmin && produtoAdmin.map(e =>
                <Route key={e._id} path={'/admin/produto/' + e._id}>
                    <ProdutoSelecionado>
                        <div className='img'>
                            <img src={e.fotourl} width='200' height='160' />
                            <form className='form' action='http://localhost:8081/admin/delete' method='POST'>
                                <button type='submit'>X</button>
                                <input type="hidden" name="token" value={window.localStorage.getItem('authorization')} />
                                <input type='hidden' name='id' value={e._id} />
                            </form>
                        </div>
                        <div>
                            <h2>{e.nome}</h2>
                            <h3 className='margin-top'>{e.descriçao}</h3>
                            <p className='margin-top'>{e.tamanho}</p>
                            <p className='p'>{e.preço}</p><br/>
                            <form action='http://localhost:8081/admin/update' method='POST'>
                                <label htmlFor='fotourl'>URL da foto:</label>
                                <input type='text' name='fotourl' /><br/>
                                <label htmlFor='nome'>Nome:</label>
                                <input type='text' name='nome' /><br/>
                                <label htmlFor='descriçao'>Descrição:</label>
                                <input type='text' name='descriçao' /><br/>
                                <label htmlFor='tamanho'>Tamanho:</label>
                                <input type='text' name='tamanho' /><br/>
                                <label htmlFor='tipo'>Tipo:</label>
                                <input type='text' name='tipo' /><br/>
                                <input type="hidden" name="token" value={window.localStorage.getItem('authorization')} />
                                <input type='hidden' name='id' value={e._id} />
                                <button type='submit'>Editar</button>
                            </form>
                        </div>
                    </ProdutoSelecionado>
                </Route>
            )}

        </>
    )
}