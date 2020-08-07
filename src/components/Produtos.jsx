import React, { memo } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'

const animation = keyframes`
    0%{
        margin-left: -100px;
        width: 0%;
        height: 0%
        opacity: 0;
    }
    30%{
        margin-left: -60px;
        width: 0%;
        height: 0%
        opacity: 0.2;
    }
    50%{
        margin-left: -40px;
        width: 0%;
        height: 0%
        opacity: 0.3;
    }
    70%{
        margin-left: -40px;
        width: 0%;
        height: 0%
        opacity: 0.5;
    }
    90%{
        margin-left: -40px;
        width: 0%;
        height: 0%
        opacity: 0.6;
    }
    99%{
        margin-left: -10px;
        width: 140px;
        height: 120px;
        opacity: 0.8;
    }
`
const animationContainer = keyframes`
    0%{
        margin-left: -11100px;
        opacity: 0;
    }
    30%{
        margin-left: -60px;
        opacity: 0;
    }
    50%{
        margin-left: 40px;
        opacity: 0;
    }
    70%{
        margin-left: 40px;
        opacity: 0;
    }
    90%{
        margin-left: 40px;
        opacity: 0;
    }
    99%{
        margin-left: 10px;
        opacity: 0.8;
    }
`

const Produtos = styled.main`
    @media(max-width: 375px){
        width: auto;
        height: auto;
        overflow: hidden;
        margin-left: 8px;
        display: inline-block;
    div{
        margin: 20px 0 0 10px;
    }
    div img {
        border-radius: 10px;
        float: left;
        animation: ${animation} 1s
    }
    .container {
        margin-left: 185px;
        margin-top: 10px;
        animation: ${animationContainer} 1s
    }
    h5 {
        color: #89750c;
    }
    a {
        color: black;
        text-decoration: none;
    }
}
`

function produtos(props) {

    return (
        <Produtos>
            {!!props.produtos && !props.produtosAdmin && props.produtos.map(e =>
                //para cada produto um novo link, que também sera criado dinamicante
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
            {/* faz basicamente a mesma coisa da rota raiz do site, diferença apenas que pode excluir, adicionar e mudar itens disponiveis  */}
            {!!props.produtosAdmin && props.produtosAdmin.map(e =>
                <Link key={e._id} to={'/admin/produto/' + e._id}>
                    <div>
                        <img width='140' height='120' src={e.fotourl} />
                        <div className='container'>
                            <h3>{e.nome}</h3>
                            <h5>{e.preço}</h5>
                        </div>
                    </div>
                </Link>
            )}
            {props.children}
        </Produtos>
    )
}

export default memo(produtos)