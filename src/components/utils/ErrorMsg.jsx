import React from 'react'
import styled, {keyframes} from 'styled-components'

const animation = keyframes`
    0%{
        left: 0;
    }
    80%{
        left: 0;
    }
`

const Error = styled.div `
    width: auto;
    height: 50px;
    background: #ff3333;
    text-align: center;
    border-radius: 8px;
    display: none;
    &.show{
        display: inline;
        position: relative;
        left: -500px;
        animation: ${animation} 4s;
    }
`

export default () => 
    <Error className='errorMsg'></Error>