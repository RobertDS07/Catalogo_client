import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../../../assets/logo.png'
import Options from './Options'

const Header = styled.header`
    position: absolute;
    left: 2%;
    top: 2%;
    display: flex;
    flex-direction: row;
    font-family: 'Inter', sans-serif;
`

export default () => {
    return (
        <Header>
            <Link to="/">
                <img src={logo} alt="logo" />
            </Link>
            <Options />
        </Header>
    )
}
