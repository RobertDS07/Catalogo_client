import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'

import formatter from '../../../utils/formatter'

const animationContainer = keyframes`
    0%{
        margin-left: -30px;
        opacity: 0;
    }
    90%{
        margin-left: -30px;
        opacity: 0;
    }
    99%{
        margin-left: 0px;
        opacity: 0.8;
    }
`

const Produtos = styled.main`
    h3 {
        font-size: 15px;
    }
    h5 {
        color: #89750c;
    }
    a {
        color: black;
        text-decoration: none;
        margin: 10px 10px 10px 10px;
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
    width: 106%;
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

const Content = styled.div`
        word-wrap: break-word;
        float: right;
        margin: 10px;
        width: 320px;
        display: flex;
        animation: ${animationContainer} ${props => props.delay * 13 + 'ms'};
    & img {
        flex-shrink: 0;
        border-radius: 10px;
        margin-right: 18px;
    }

    @media (max-width: 719px) {
        margin-left: unset;
        width: 400px;

        & img {
            margin-right:30px;
        }
    }
    @media (max-width: 405px) {
        margin-left: unset;
        width: 390px;

        & img {
            margin-right:30px;
        }
    }
    @media (max-width: 376px) {
        margin-left: unset;
        width: 370px;

        & img {
            margin-right:30px;
        }
    }
    @media (max-width: 321px) {
        margin-left: unset;
        width: 315px;

        & img {
            margin-right:30px;
        }
    }
`

export default props => {
    return (
        <Produtos>
            <div className='catchContent'>
                {!!props.produtos && props.produtos.map((e, index) =>
                    <Link key={e.id} to={`/${props.storeName}/product/${e.id}`}>
                        <Content delay={index}>
                            <img width='130' height='173' loading='lazy' alt={e.name} src={e.fotourl} className='productImg'></img>
                            <div className='container' onScroll={() => console.log('oi')}>
                                <h3 style={{ textTransform: "uppercase" }}>{e.name}</h3><br />
                                <h5>{formatter.format(e.price)}</h5>
                            </div>
                        </Content>
                    </Link>
                )}
            </div>
        </Produtos>
    )
}