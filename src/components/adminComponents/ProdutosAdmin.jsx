import React, { memo } from 'react'
import styled from 'styled-components'

const ProdutosAdmin = styled.main`
    @media(max-width: 375px){
        width: auto;
        height: auto;
        margin-left: 8px;
        display: flex;
        flex-direction: column;
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

function produtosAdmin(props) {
    return (
        <ProdutosAdmin>
            {props.children}
        </ProdutosAdmin>
    )
}

export default memo(produtosAdmin)