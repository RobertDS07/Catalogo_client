import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ScrollNav = styled.div`
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
    @media(min-width: 501px){
        width: 100%;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        bottom: 0;
    }
`

export default props =>
    <ScrollNav>
        {!props.tipo && !props.tipoAdmin && <h3>Loading...</h3>}
        {/* link para raiz do site  */}
        {/* esse onclick aqui é uma baita de uma gambiarra eu juro que arrumo isso alguma hora me desculpem */}
        {!props.tipoAdmin && <Link to='/' onClick={() => {document.querySelector('.sort').children[0].innerHTML = 'Tudo'}}>Tudo</Link>}
        {/* setando cada um dos tipos com um link */}
        {!!props.tipo && props.tipo.map(e => <Link key={e} onClick={() => {document.querySelector('.sort').children[0].innerHTML = e}} to={e}>{e}</Link>)}

        {/* link para raiz do site ADM*/}
        {!!props.tipoAdmin && <Link to='/admin/catalogo'>Tudo</Link>}
        {/* setando cada um dos tipos com um link */}
        {!!props.tipoAdmin && props.tipoAdmin.map(e => <Link key={e} to={'/admin/catalogo/' + e}>{e}</Link>)}
    </ScrollNav>