import React from 'react'
import styled, {keyframes} from 'styled-components'

const animation = keyframes`
    0%{
        left: -200px;
    }
    10%{
        left: 5px;
    }
    80%{
        left: 5px;
    }
`

const Error = styled.div `
    background: #1F1F1F;
    background: rgba(0,0,0,.9);
    padding: 15px;
    border-radius: 15px;
    color: #FFF;
    text-shadow: -1px -1px 0 rgba(0,0,0,.5);
    width: 200px;
    height: auto;
    line-break: auto;
    position: fixed;
    bottom: 5px;
    z-index: 4;
    text-align: center;
    display: none;
    &.show{
        display: inline;
        left: -500px;
        animation: ${animation} 4s;
    }
    &.error{
        background: #FE1A00;
        background: rgba(254,26,0,.9);
    }
    &.success{
        background: #17980E;
        background: rgba(92,184,17,.9);
    }
`

export default () => 
    <Error className='message'></Error>