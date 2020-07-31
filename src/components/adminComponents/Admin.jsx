import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

const Admin = styled.div`
    width: 500px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

export default props =>
    <Admin>
        <div>
            <label htmlFor="user">Usuário:</label>
            <input type="text" name="user" id="user"/><br/>
            <label htmlFor="password">Senha:</label>
            <input type="password" name="password" id="password"/><br/>
            <button type="submit" onClick={() => login()}>Logar</button>
        </div>
    </Admin>

    function login(){
        const user = document.querySelector('#user').value
        const password = document.querySelector('#password').value
       
        const token = async () => await axios.post('http://localhost:8081/auth', {
            user: user,
            password, password
        })

        token().then(res => window.localStorage.setItem('authorization', res.data))
    }