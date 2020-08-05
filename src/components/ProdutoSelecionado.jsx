import React from 'react'
import styled from 'styled-components'

const ProdutoSelecionado = styled.main`
    @media(max-width: 375px){
        text-align: center;
        align-items: center;
        justify-content: center;
        margin: 20px;

        img{
            border-radius: 10px;
        }
        .p{
            color: #89750c;
        }
        .margin-top{
            margin-top: 15px;
        }
        .img {
        width: auto;
        height: auto;
        position:relative;
        }
        .img button{
            border-radius: 50%;
            width: 50px;
            height: 50px;
            border: none;
        }
        .form{
            position: absolute;
            top: 0;
            right: 0;
            text-align: center;
        }
    }
`

export default props =>
    <ProdutoSelecionado>
        {props.children}
    </ProdutoSelecionado>