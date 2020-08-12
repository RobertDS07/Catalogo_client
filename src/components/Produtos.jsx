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
    .content{
        width: 320px;
        display: flex;
    }
    .content img {
        flex-shrink: 0;
        border-radius: 10px;
        float: left;
        animation: ${animation} 1s
    }
    .container {
        word-wrap: break-word;
        float: right;
        margin-left: 30px;
        margin-top: 10px;
        animation: ${animationContainer} 1s
    }
    h3 {
        font-size: 15px;
    }
    h5 {
        color: #89750c;
    }
    a {
        color: black;
        text-decoration: none;
        margin: 10px 10px 10px 0;
        border-radius: 5px;
    }
    a:hover{
        outline: 1px solid (211,211,211, 0.5);
        box-shadow: 0 2px 10px #D3D3D3;
    }
    a:hover img{
        filter: grayscale(40%);
    }

@media(max-width: 500px){
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
@media(min-width: 501px){
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .catchContent{
        width: 800px;
        height: auto;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
}
@media(min-width: 1400px) {
    grid-area: main;
    display: inline-block;
    .catchContent{
        width: auto;
        height: auto;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
}
`

function produtos(props) {

    return (
        <Produtos>
            <div className='catchContent'>
                {!props.tipo && !props.produtosAdmin && !!props.produtos && props.produtos.map(e =>
                    //para cada produto um novo link, que também sera criado dinamicante
                    <Link key={e._id} to={'/' + e._id}>
                        <div className='content'>
                            <img width='140' height='120' src={e.fotourl}></img>
                            <div className='container'>
                                <h3>{e.nome}</h3><br />
                                <h5>R$ {e.preço}</h5>
                            </div>
                        </div>
                    </Link>
                )}
                {/* essa parte pode realmente ter ficado dificil de entender, mas vou tentar explicar, estou pegando e validando primeiramente se aqui eu estou passando o props.tipo que ta sendo passado la do routes, esse tipo é o tipo que o cliente está, PS: como tipo entendam categoria... Com o tipo em mãos eu simplesmente peguei a função de validar produtos e taquei todos os produtos pra lá junto com a categoria que o cliente deseja, desse jeito me retornando apenas os produtos do tipo desejado */}
                {!props.produtosAdmin && !!props.produtos && !!props.tipo && !!props.validateProducts && props.produtos.map(produto => props.validateProducts(produto, props.tipo))}

                {/* faz basicamente a mesma coisa da rota raiz do site, diferença apenas que pode excluir, adicionar e mudar itens disponiveis  */}
                {!!props.produtosAdmin && props.produtosAdmin.map(e =>
                    <Link key={e._id} to={'/admin/produto/' + e._id}>
                        <div className='content'>
                            <img width='140' height='120' src={e.fotourl} />
                            <div className='container'>
                                <h3>{e.nome}</h3><br />
                                <h5>R$ {e.preço}</h5>
                            </div>
                        </div>
                    </Link>
                )}
                {!!props.produtoAdmin && !!props.tipoAdmin && !!props.validateProducts && props.produtoAdmin.map(produto => props.validateProducts(produto, props.tipoAdmin))}
            </div>
        </Produtos>
    )
}

export default memo(produtos)