import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ScrollNav = styled.div`
@media(max-width: 375px){
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
}
`

export default props =>
    <ScrollNav>
        {!props.tipo && !props.tipoAdmin && <h3>Loading...</h3>}
        {/* link para raiz do site  */}
        {!props.tipoAdmin && <Link to='/'>Tudo</Link>}
        {/* setando cada um dos tipos com um link */}
        {!!props.tipo && props.tipo.map(e => <Link key={e} to={e}>{e}</Link>)}

        {/* link para raiz do site ADM*/}
        {!!props.tipoAdmin && <Link to='/admin/catalogo'>Tudo</Link>}
        {/* setando cada um dos tipos com um link */}
        {!!props.tipoAdmin && props.tipoAdmin.map(e => <Link key={e} to={'/admin/catalogo/' + e}>{e}</Link>)}
    </ScrollNav>