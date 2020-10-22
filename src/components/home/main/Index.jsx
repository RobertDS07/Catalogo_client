import React from 'react'
import styled from 'styled-components'

import mainImg from '../../../assets/mainImg.svg'

const Main = styled.main`
    width: 100vw;
    height: 100vh;
    background-color: #F1F7FA;
    display: grid;
    grid-template-areas: 
    "left right";
    font-family: 'Inter', sans-serif;

    .wrapperText{
        grid-area: ${props => props.right ? "right" : "left"};
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.4rem;
        color: #072540;
        padding-left: 40px;
    }
    span {
        color: #9C4668;
    }

    .wrapperImg{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 200px;
    }
`

export default () => {
    return(
        <Main>
            <div className="wrapperText">
                <h1><span>Torne seu negócio mais profissional </span>por menos de 6 reais por mês.</h1>
            </div>
            <div className="wrapperImg">
                <img src={mainImg}></img>
            </div>
        </Main>
    )
}