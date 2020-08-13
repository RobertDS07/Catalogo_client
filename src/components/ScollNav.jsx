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
            {/* aqui é onde eu trato o search do usuario, onde sempre que o usuario fechar o input ele ira retornar para a função de search null, e desse modo ira cair na condição para setar o productsSearch como false, assim o componente Produtos volta a exibir os produtos default  */}
            {!searchArea && <img src={search} alt='Search' width='16' height='16' onClick={() => setSearchArea(true)} />}
            {searchArea && <h3 onClick={() => {setSearchArea(false); props.searchFunction(null)}}>X</h3>}
            {searchArea && <input type='text' placeholder='O que você procura?' onChange={e => props.searchFunction(e.target.value)} ></input>}
            
            {/* esse onclick aqui é uma baita de uma gambiarra para estética do site, eu juro que arrumo isso alguma hora me desculpem */}
            {/* link para raiz do site  */}
            {!props.tipoAdmin && !searchArea && <Link to='/' onClick={() => { document.querySelector('.sort').children[0].innerHTML = 'Tudo' }}>Tudo</Link>}

            {/* setando cada um dos tipos com um link */}
            {!!props.tipo && !searchArea && props.tipo.map(e => <Link key={e} onClick={() => { document.querySelector('.sort').children[0].innerHTML = e }} to={e}>{e}</Link>)}

            {/* link para raiz do site ADM*/}
            {!!props.tipoAdmin && !searchArea && <Link onClick={() => { document.querySelector('.sort').children[0].innerHTML = 'Tudo' }} to='/admin/catalogo'>Tudo</Link>}

            {/* setando cada um dos tipos com um link */}
            {!!props.tipoAdmin && !searchArea && props.tipoAdmin.map(e => <Link key={e} onClick={() => { document.querySelector('.sort').children[0].innerHTML = e }} to={'/admin/catalogo/' + e}>{e}</Link>)}
        </ScrollNav>
    )
}