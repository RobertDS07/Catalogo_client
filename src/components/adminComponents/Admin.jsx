import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const Admin = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;

    div{
        width: auto;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    @media(min-width: 1400px){
            grid-area: main;
    }
`

function login() {
    const user = document.querySelector('#user').value
    const password = document.querySelector('#password').value

    const token = async () => await axios.post('http://localhost:8081/auth', {
        user: user,
        password: password
    })

    token().then(res => {
        res.status === 401 ? console.log(res) : window.localStorage.setItem('authorization', res.data)
    })
    return (
        <Redirect to='/admin/catalogo'/>
    )
}

export default function (props) {
    return (
        <Admin>
            <div>
                <label htmlFor="user">Usuário:</label>
                <input type="text" name="user" id="user" /><br />
                <label htmlFor="password">Senha:</label>
                <input type="password" name="password" id="password" onKeyDown={e => e.key === 'Enter' ? login() : '' } /><br />
                <button type="submit" onClick={() => login()}>Logar</button>
                { window.localStorage.length != 0 && <Redirect to='/admin/catalogo' /> }
            </div>
        </Admin>
    )
}