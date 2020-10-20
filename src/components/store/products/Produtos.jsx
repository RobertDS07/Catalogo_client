import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'

import formatter from '../../../utils/formatter'

const animation = keyframes`
    0%{
        margin-left: -100px;
        width: 0%;
        opacity: 0;
    }
    30%{
        margin-left: -60px;
        width: 0%;
        opacity: 0.2;
    }
    50%{
        margin-left: -40px;
        width: 0%;
        opacity: 0.3;
    }
    70%{
        margin-left: -40px;
        width: 0%;
        opacity: 0.5;
    }
    90%{
        margin-left: -40px;
        width: 0%;
        opacity: 0.6;
    }
    99%{
        margin-left: -10px;
        width: 140px;
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
        justify-content: flex-start;
    }
}
`

export default props => {
    return (
        <Produtos>
            <div className='catchContent'>
                {!!props.produtos && props.produtos.map(e =>
                    <Link key={e.id} to={`/${props.storeName}/product/${e.id}`}>
                        <div className='content'>
                            <img width='130' height='173' alt={e.name} src={e.fotourl}></img>
                            <div className='container'>
                                <h3 style={{textTransform:"uppercase"}}>{e.name}</h3><br />
                                <h5>{formatter.format(e.price)}</h5>
                            </div>
                        </div>
                    </Link>
                )}
            </div>
        </Produtos>
    )
}