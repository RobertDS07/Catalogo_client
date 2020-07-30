import React from 'react'
import styled from 'styled-components'

const ScrollNav = styled.div`
@media(max-width: 375px){
    width: auto;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space:nowrap;
    margin-top: auto;

    &::-webkit-scrollbar {
    display: none;
  }
    a {
        color: grey;
        font-weight: 900;
        text-decoration: none;
        display: inline-block;
        margin-left: 10px;
    }
    a:focus{
        border-bottom: 2px solid black;
        border-radius: 2px;
    }
}
`

export default props =>
    <ScrollNav>{props.children}</ScrollNav>