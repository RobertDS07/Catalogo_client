import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import search from '../assets/search.png'
import { useState } from 'react'

const ScrollNav = styled.div`
    width: auto;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space:nowrap;
    margin-top: auto;

    &::-webkit-scrollbar {
    display: none;
  }
    img{
        cursor: pointer;
        transform: rotateY(180deg);
        margin-bottom: 2px;
    }
    h3{
        margin: 0 0 2px 3px;
        color: #89750c;
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
    @media(min-width: 1400px){
        position: relative;
        flex-direction: column;
    }
`

export default props => {
    const [searchArea, setSearchArea] = useState(false)

    return (
        <ScrollNav>
            {/* esse onclick aqui é uma baita de uma gambiarra eu juro que arrumo isso alguma hora me desculpem */}
            {!props.tipoAdmin && !searchArea && <img src={search} width='16' height='16' onClick={() => setSearchArea(true)} />}

            {!props.tipoAdmin && searchArea && <h3 onClick={() => setSearchArea(false)}>X</h3>}

            {/* link para raiz do site  */}
            {!props.tipoAdmin && !searchArea && <Link to='/' onClick={() => { document.querySelector('.sort').children[0].innerHTML = 'Tudo' }}>Tudo</Link>}

            {/* setando cada um dos tipos com um link */}
            {!!props.tipo && !searchArea && props.tipo.map(e => <Link key={e} onClick={() => { document.querySelector('.sort').children[0].innerHTML = e }} to={e}>{e}</Link>)}

            {/* link para raiz do site ADM*/}
            {!!props.tipoAdmin && <Link to='/admin/catalogo'>Tudo</Link>}

            {/* setando cada um dos tipos com um link */}
            {!!props.tipoAdmin && props.tipoAdmin.map(e => <Link key={e} to={'/admin/catalogo/' + e}>{e}</Link>)}
        </ScrollNav>
    )
}