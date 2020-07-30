import React, { memo } from 'react'
import styled from 'styled-components'

const Produtos = styled.main`
    @media(max-width: 375px){
        width: auto;
        height: auto;
        margin-left: 8px;
        display: flex;
        flex-direction: column;
    
    &.produtoSelecionado{
        text-align: center;
        align-items: center;
        justify-content: center;
        margin: 20px;
    }
    div{
        margin: 20px 0 0 10px;
    }
    div img {
        border-radius: 10px;
        float: left;
    }
    .container {
        margin-left: 185px;
        margin-top: 10px;
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
            {props.children}
        </Produtos>
    )
}

export default memo(produtos)