import React from 'react'
import styled from 'styled-components'

import notfound from '../../assets/404.png'

const NotFound = styled.div`
    grid-area: main;
    display: flex;
    justify-content: center;
    .wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;
        max-height: 500px;
    }
`

export default () => 
    <NotFound>
        <div className="wrapper">
            <img src={notfound} alt="404 NOT FOUND" width='200' height='200'/>
            <h1>Link não encontrado (404 error)</h1>
            <br/>
            <p>Se você acha que o que esta procurando realmente deveria estar aqui, por favor fale com o dono do site.</p>
        </div>
    </NotFound>