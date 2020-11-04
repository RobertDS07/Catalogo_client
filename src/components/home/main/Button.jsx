import React from 'react'
import styled from 'styled-components'

const PrimaryButton = styled.button`
    position: relative;
    width: 181px;
    min-height: 71px;
    padding: 20px;
    margin-top: 20px;
    background-color: #9994f3;
    font-family: 'Inter', sans-serif;
    font-size: 1.3rem;
    font-weight: 600;
    border-radius: 200px;
    border: none;
    outline: none;
    cursor: pointer;
    @media (min-width: 760px) and (max-width: 1199px) {
        width: auto;
        min-height: 41px;
    }
`

export default (props) => <PrimaryButton>{props.children}</PrimaryButton>
