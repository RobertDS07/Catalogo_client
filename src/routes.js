import React, { useState, useEffect } from 'react';
import {
    Route,
    Link,
    Redirect,
    Switch,
} from "react-router-dom";
import axios from 'axios'

import Produtos from './components/Produtos'
import ProdutoSelecionado from './components/ProdutoSelecionado'
import Sort from './components/Sort'
import Nav from './components/Nav'
import A from './components/A'
import ScrollNav from './components/ScollNav'
import NavResponsive from './components/NavResponsive';
import Loading from './components/Loading'

import Modal from './components/adminComponents/Modal'
import Admin from './components/adminComponents/Admin'

import whats from './assets/whats.png'
import logo from './assets/logo.png'
import arrowUp from './assets/arrowUp.png'

export default function () {
    // State utilizado para atualizar o useEffect toda vez que o usuario modificar o sort, desse jeito fazendo uma nova requisição ao server para que em todos as categorias tenham o mesmo sort 
    const [sort, setSort] = useState('tipo')
    // state utilizado para ver se o admin está logado ou não 
    const [logged, setLogged] = useState(false)
    // State utilizado para pegar os produtos do DB 
    const [produtos, setProdutos] = useState()

    // pegando os itens para a utilizar na raiz do site (todos os produtos)
    useEffect(() => {
        const getProdutos = async () => await axios.post('https://catalogo-server.herokuapp.com/', {
            sort: sort,
        })

        getProdutos().then(res => setProdutos(res.data))
    }, [sort, logged])

    // State utilizado para pegar todos os tipos(como tipos entendam categorias) disponiveis no DB para utilizar também na função validateProducts
    const [tipo, setTipo] = React.useState()

    React.useEffect(() => {
        const dados = async () => await axios.get('https://catalogo-server.herokuapp.com/tipos')
        dados().then(res => setTipo(res.data))
        // Quando o logged for alterado ele fara uma nova requisição para dar um rerender no componente 
    }, [logged])

    const [produtoAdmin, setProdutoAdmin] = useState()
    // pegando todos os produtos do Admin, é exatamente o que fiz na parte da raiz do site, a diferença é que se o usuario tentar logar a rota de admin não ira carregar os produtos
    useEffect(() => {
        //enviando o token para autenticação de admin
        const token = localStorage.getItem('authorization')
        const getProdutos = async () => await axios.post('https://catalogo-server.herokuapp.com/admin/', {
            token: token,
            sort: sort
        })
        getProdutos().then(res => setProdutoAdmin(res.data))
    }, [sort, logged])

    const [tipoAdmin, setTipoAdmin] = React.useState()

    // pegando todos os tipos novamente para fazer usar na função validateProducts, dessa vez para o admin
    React.useEffect(() => {
        const token = localStorage.getItem('authorization')
        const dados = async () => await axios.post('https://catalogo-server.herokuapp.com/admin/tipos', { token: token })
        dados().then(res => setTipoAdmin(res.data))
    }, [logged])

    // função citada, que serve para receber cada um dos produtos e organizar onde cada um deve ficar, tornando o processo de categoria/produtos muito mais simples e automatizada
    function validateProducts(product, requiredType) {
        //faz a comparação da categoria do produto e dos tipos pegos com o setTipo
        if (window.localStorage.length === 0) {
            if (product.tipo === requiredType) {
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
        if (window.localStorage.length !== 0) {
            if (product.tipo === requiredType) {
                return (
                    <Link key={product._id} to={'/admin/produto/' + product._id}>
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
    }

    // esse productsSearch serão os produtos que eu irei passar para dentro do componente quando houver um chamado de search
    const [productsSearch, setProductsSearch] = useState(false)
    // função feita para o search do usuario, onde ele da um .filtter nos produtos
    function searchFunction(text) {
        // Provavelmente eu não precisava de tantas validações assim mas quem arrisca não petisca 
        if (text !== '' && text !== null && text !== undefined) {
            // encapsulando os produtos que passarem pela validação do .filter 
            setProductsSearch(produtos.filter(e => {
                if (e.nome.toLowerCase().includes(text.toLowerCase())) {
                    return e
                }
            }))
            // essa parte eu achei bem legal, pois mais abaixo eu faço uma validação que se o productsSearch for false ele ira mostra os produtos do próprio produtos (que foram pegos do BD) 
        } else {
            setProductsSearch(false)
        }
    }
    
    // Aqui eu pego e vejo se vai precisar da parte da nav lateral, disponivel apartir de 1400px de width, provavelmente deve ter um jeito mais eficiente de fazer isso, talvez juntando os componentes nav e scrollNav em um só, e transformando-os no NavResponsive.jsx quando o width > 1400, mas por enquanto deixarei assim, talvez em alguma futura refatoração do código eu arrume...
    const [responsive, setResponsive] = useState(false)
    window.addEventListener('load', () => window.innerWidth < 1400 ? setResponsive(false) : setResponsive(true))
    window.addEventListener('resize', () => window.innerWidth < 1400 ? setResponsive(false) : setResponsive(true))


    return (
        <>
            {/* Simples laoding, que praticamente não aparece direito, ainda não entendi por que tentei de todos os jeitos, mas pelo o que eu me lembre o browser sempre carrega js por ultimo e acaba que sendo o loading um componente jsx ele vem junto com o resto, não da muito efeito, tentei tambem passar ele sem ser componente para o app.js mas não obtive sucesso, talvez em uma futura refatoração eu arrume isso também.  */}
            {!produtos && <Loading/>}
            {/* Possivelmente esse A.jsx não precisaria existir, mas acabei deixando também ksksks, faço algo legal com ele também quando o responsive fica true, transformando-o em um tipo de <hr/>  */}
            <A link='https://www.instagram.com/direto__do__closet/' txt='@direto_do_closet' />

            {/* aqui eu faço essas verificações para ver se o admin não está logado e também para ver se não esta no layout responsive, pois lá tem uma area com o watsapp já  */}
            {window.localStorage.length === 0 && window.innerWidth < 1400 &&
                <a className='whats' href='https://wa.me/5551989424940?text=Oii%20'>
                    <img src={whats} alt='51989424940' width='70' height='70' />
                </a>
            }

            {/* Caso esteja no layout responsive ele eu adiciono uma seta para subir ao topo rápido  */}
            {window.innerWidth > 1400 &&
                <img className='arrowUp' src={arrowUp} alt='Ir para o topo' width='50' height='50' onClick={() => window.scrollTo(0, 0)} />
            }

            {/* Só para deixar anotado eu não estou gostando de utilizar esse tipo de verificação para ver se o admin está logado ou não, mas acaba que o site é para minha namorada e creio que os clientes dela não irão ver as vulnerabilidades, e mesmo se tentassem o localstorage.length ser diferente de 0 ainda não os da a permissão de adicionar ou deletar nada, pois as requisições necessitam do token jwt para passar pelo middleware do back  */}
            {window.localStorage.length !== 0 &&
                // Modal para adicionar itens ao DB 
                <Modal />
            }

            <img className='logo' alt='Direto_Do_Closet' src={logo} />

            {/* verificação para ver se o cliente está no layout responsivo ou não, para assim não carregar 2 Nav  */}
            {!responsive &&
                <>
                    <Nav>
                        {window.localStorage.length === 0 &&
                            <ScrollNav searchFunction={searchFunction} tipo={tipo} />
                        }
                        {/* diferenciando se é admin ou não  */}
                        {window.localStorage.length !== 0 &&
                            <ScrollNav searchFunction={searchFunction} tipoAdmin={tipoAdmin} />
                        }
                    </Nav>

                    <Sort setSort={setSort}></Sort>
                </>
            }

            {responsive && window.localStorage.length === 0 &&
                <NavResponsive tipo={tipo} searchFunction={searchFunction} setSort={setSort} />
            }
            {responsive && window.localStorage.length !== 0 &&
                <NavResponsive tipoAdmin={tipoAdmin} searchFunction={searchFunction} setSort={setSort} />
            }

            {/* Esse switch eu adicionei agora na quase terminando o projeto para poder tratar o notFound */}
            <Switch>
                {/* rota raiz da aplicação */}
                <Route exact path="/">
                    {/* Aqui eu faço uma validação para ver se o usuario esta pesquisando algo, dessa forma passando o productsSearch invés de produtos  */}
                    {!productsSearch && <Produtos produtos={produtos} />}
                    {!!productsSearch && <Produtos search={productsSearch} />}
                </Route>

                {/* criando cada rota dinamicante com os tipos disponiveis no DB, fazerndo um map no tipo, e passando para dentro de produtos, junto com a função para organizar tudo em seu devido lugar*/}
                {!!tipo && tipo.map(tipo =>
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

                {/* criando a rota para o admin logar */}
                <Route exact path='/admin'>
                    <Admin setLogged={setLogged} logged={logged} />
                </Route>

                {/* criando a rota do catalogo do admin, onde se a pessoa não estiver logada não conseguira ver  */}
                <Route exact path='/admin/catalogo'>
                    {!productsSearch && <Produtos produtosAdmin={produtoAdmin} />}
                    {!!productsSearch && <Produtos searchAdmin={productsSearch} />}
                    {window.localStorage.length === 0 && <Redirect to='/' />}
                </Route>

                {!!tipoAdmin && tipoAdmin.map(tipo =>
                    //criando cada rota dinamicante com os tipos disponiveis no DB para o admin
                    <Route key={tipo} path={'/admin/catalogo/' + tipo}>
                        {!productsSearch && <Produtos produtoAdmin={produtoAdmin} tipoAdmin={tipo} validateProducts={validateProducts} />}
                        {!!productsSearch && <Produtos tipoAdmin={tipo} searchAdmin={productsSearch} validateProducts={validateProducts} />}
                        {window.localStorage.length === 0 && <Redirect to='/' />}
                    </Route>
                )}

                {/* aqui é onde eu crio as rotas para cada produto dinamicamente, para quando forem clicados o cliente vir para essa rota e ver melhor cada descrição e etc... */}
                {!!produtoAdmin && produtoAdmin.map(e =>
                    <Route key={e._id} path={'/admin/produto/' + e._id}>
                        <ProdutoSelecionado produtosAdmin={e} />
                        {window.localStorage.length === 0 && <Redirect to='/' />}
                    </Route>
                )}

                {/* caso o usuario tente acessar alguma rota inexistente  */}
                <Route>
                    <Produtos pageNotFound='404' />
                </Route>
            </Switch>
            {/* vou mostrar o footer apenas se estiver em layout responsivo, pois no mobile fica muito feio  */}
            {responsive && <footer><a href='https://twitter.com/bugextreme1'>Desenvolvido por Robert Damaceno</a></footer>}
        </>
    )
}