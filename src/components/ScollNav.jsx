import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import search from '../assets/search.png'

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
        color: #89750c;
        float: left;
        padding-top: 2px;
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
    input{
        border: none;
        outline: none;
        padding: 7px;
        font-size: 16px;
    }
`

export default props => {
    const [searchArea, setSearchArea] = useState(false)

    return (
        <ScrollNav>
            {!searchArea && <img src={search} alt='Search' width='16' height='16' onClick={() => setSearchArea(true)} />}
            {searchArea && <h3 onClick={() => {setSearchArea(false); props.searchFunction(null)}}>X</h3>}
            {searchArea && <input type='text' placeholder='O que você procura?' onChange={e => props.searchFunction(e.target.value)} ></input>}
            
            {!props.tipoAdmin && !searchArea && <Link to='/' onClick={() => { document.querySelector('.sort').children[0].innerHTML = 'Tudo'}}>Tudo</Link>}

            {!!props.tipo && !props.tipoAdmin && !searchArea && props.tipo.map(e => <Link key={e} onClick={() => { document.querySelector('.sort').children[0].innerHTML = e }} to={e}>{e}</Link>)}

            {!!props.tipoAdmin && !searchArea && <Link onClick={() => { document.querySelector('.sort').children[0].innerHTML = 'Tudo' }} to='/admin/catalogo'>Tudo</Link>}

            {!!props.tipoAdmin && !searchArea && props.tipoAdmin.map(e => <Link key={e} onClick={() => { document.querySelector('.sort').children[0].innerHTML = e }} to={'/admin/catalogo/' + e}>{e}</Link>)}
        </ScrollNav>
    )
}