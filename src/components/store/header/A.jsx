import React from 'react'
import styled from 'styled-components'

const A = styled.div`
    width: 100%;
    background-color: #e4e6e8;
    display: flex;
    align-items: center;
    justify-content: center;

    a {
        color: grey;
        text-decoration: none;
    }
    @media (min-width: 1400px) {
        grid-area: cabeçalho;
        height: 2px;
        margin-top: auto;
        a {
            visibility: hidden;
            color: #e4e6e8;
        }
    }
`

export default (props) => (
    <A>
        <a href={props.link}>{props.txt}</a>
    </A>
)
