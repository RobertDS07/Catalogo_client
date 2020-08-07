import React from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.png'

const Nav = styled.nav`
    @media(max-width: 375px){
        width: 100%;
        height: 100px;
        display: flex;
        vertical-align: bottom;

        img{
            position: absolute;
            left: calc(100% - 60%);
        }
    }
`

export default props =>
    <Nav>
        <img src={logo}></img>
        {props.children}
    </Nav>