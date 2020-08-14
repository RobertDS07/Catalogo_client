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

export default function (props) {
    function login() {
        // pegando os valores dos inputs para passar para o db 
        const user = document.querySelector('#user').value
        const password = document.querySelector('#password').value

        const token = async () => await axios.post(`https://catalogo-server.herokuapp.com/auth`, {
            user: user,
            password: password
        })

        token().then(res => {
            if (res.status === 401) {
                console.log(res)
            } else {
                window.localStorage.setItem('authorization', res.data)
                return setTimeout(() => props.setLogged(true), 1000) 
            } 
        })
    }

    return (
        <Admin>
            <div>
                <label htmlFor="user">Usuário:</label>
                <input type="text" name="user" id="user" /><br />
                <label htmlFor="password">Senha:</label>
                <input type="password" name="password" id="password" onKeyDown={e => e.key === 'Enter' ? login() : ''} /><br />
                <button type="submit" onClick={() => login()}>Logar</button>
                {props.logged && <Redirect to='/admin/catalogo' />}
            </div>
        </Admin>
    )
}