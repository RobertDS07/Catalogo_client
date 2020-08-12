import React from 'react'
import styled from 'styled-components'

const Nav = styled.nav`
        width: 100%;
        min-height: 100px;
        display: flex;
        position: relative;

        @media(min-width: 1400px){
            grid-area: nav;
        }
`

export default props =>
    <Nav>
        {props.children}
    </Nav>