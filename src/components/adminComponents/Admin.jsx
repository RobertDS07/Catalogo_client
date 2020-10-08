import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

import showErrorFunction from '../../utils/showErrorMsg'

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
    const login = async () => {
        const email = document.querySelector('#email').value
        const password = document.querySelector('#password').value

        try{
        const res = await axios.post(process.env.REACT_APP_API || 'http://localhost:8081/graphql', {
            query: `
                {
                    login(email:"${email}", password:"${password}")
                }
                `
        })

        localStorage.setItem('authorization', res.data.data.login)

        return props.setAdmin(true)
    } catch(e) {
        return showErrorFunction(e.response.data.errors[0].message, 'error')
    }
}
    return (
        <Admin>
            <div>
                <label htmlFor="email">Usuário:</label>
                <input type="text" name="email" id="email" autoFocus /><br />
                <label htmlFor="password">Senha:</label>
                <input type="password" name="password" id="password" onKeyDown={e => e.key === 'Enter' ? login() : ''} /><br />
                <button type="submit" onClick={() => login()}>Logar</button>
            </div>
        </Admin>
    )
}