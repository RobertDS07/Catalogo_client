import React from 'react'
import styled from 'styled-components'

const Nav = styled.nav`
        width: 100%;
        min-height: 100px;
        display: flex;
        position: relative;

        img{
            position: absolute;
            left: calc((100% - 65px)/2);
        }
`

export default props =>
        <Nav>
            {props.children}
        </Nav>