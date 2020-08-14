import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import whats from '../assets/whats.png'
import insta from '../assets/instagram.png'

const NavResponsive = styled.nav`
        width: 100%;
        min-height: 100px;
        grid-area: nav;
        #content{
            margin: 0 10px 10px 40px;
        }
        h3{
            color: grey;
            font-size: 14px;
            cursor: pointer;
        }
        h3.margin{
            margin: 15px 0 0 25px;
            font-size: 15px;
        }
        h3.selected{
            color: #c8c200;
        }
        h1{
            margin-top: 15px;
        }
        a {
            text-decoration: none;
        }
        hr{
            margin: 25px 0 25px 0;
        }
        img{
            float: left;
            margin-right: 15px;
        }
        p{
            font-weight: 600;
            font-size: 12px;
        }
`

function clearSelected() {
    let categorias = document.querySelector('#categorias')
    categorias = Array.from(categorias.children)
    categorias.forEach(element => {
        element.children[0].classList.remove('selected')
    })
}
function clearSelectedOrdenar() {
    let ordenar = document.querySelector('#ordenar')
    ordenar = Array.from(ordenar.children)
    ordenar.forEach(element => {
        element.classList.remove('selected')
    })
}

export default props => {
    return (
        <>
            <input className='search' type='text' placeholder='O que você procura?' onChange={e => props.searchFunction(e.target.value)} ></input>
            <NavResponsive>
                {!!props.tipo && !props.tipoAdmin &&
                    <div id='content'>
                        <h1>Categorias</h1>
                        <div id='categorias'>
                            <Link to='/'><h3 onClick={e => { clearSelected(); e.target.classList.add('selected') }} className='margin selected'>Tudo</h3></Link>
                            {!!props.tipo && props.tipo.map(tipo => <Link key={tipo} to={tipo}><h3 onClick={e => { clearSelected(); e.target.classList.add('selected') }} className='margin'>{tipo}</h3></Link>)}
                        </div>
                        <h1>Ordenar por</h1>
                        <div id='ordenar'>
                            <h3 className='margin selected' onClick={e => { props.setSort('tipo'); clearSelectedOrdenar(); e.target.classList.add('selected') }}>Categorias</h3>
                            <h3 className='margin' onClick={e => { props.setSort({'tipo':'asc'}); clearSelectedOrdenar(); e.target.classList.add('selected') }}>Menor preço</h3>
                            <h3 className='margin' onClick={e => { props.setSort({'tipo':'desc'}); clearSelectedOrdenar(); e.target.classList.add('selected') }}>Maior preço</h3>
                        </div>
                        <hr />
                        <a href='https://wa.me/5551989424940?text=Oii%20'>
                            <img width='30' height='30' src={whats} alt="whatss" /> <h3>+55 51 989424940</h3>
                        </a><br />
                        <a href='https://www.instagram.com/direto__do__closet/'>
                            <img width='25' height='25' src={insta} alt="insta" /> <h3>@direto__do__closet</h3>
                        </a><br /><br />
                        <p>Horário de atendimento: De segunda a sábado das 10h ás 19h</p>
                    </div>
                }
                {!!props.tipoAdmin &&
                    <div id='content'>
                        <h1>Categorias</h1>
                        <div id='categorias'>
                            <Link to='/admin/catalogo'><h3 onClick={e => { clearSelected(); e.target.classList.add('selected') }} className='margin selected'>Tudo</h3></Link>
                            {!!props.tipoAdmin && props.tipoAdmin.map(tipo => <Link key={tipo} to={'/admin/catalogo/' + tipo}><h3 onClick={e => { clearSelected(); e.target.classList.add('selected') }} className='margin'>{tipo}</h3></Link>)}
                        </div>
                        <h1>Ordenar por</h1>
                        <div id='ordenar'>
                            <h3 className='margin selected' onClick={e => { props.setSort('tipo'); clearSelectedOrdenar(); e.target.classList.add('selected') }}>Categorias</h3>
                            <h3 className='margin' onClick={e => { props.setSort({'tipo':'asc'}); clearSelectedOrdenar(); e.target.classList.add('selected') }}>Menor preço</h3>
                            <h3 className='margin' onClick={e => { props.setSort({'tipo':'desc'}); clearSelectedOrdenar(); e.target.classList.add('selected') }}>Maior preço</h3>
                        </div>
                        <hr />
                        <a href='https://wa.me/5551989424940?text=Oii%20'>
                            <img width='30' height='30' src={whats} alt="whatss" /> <h3>+55 51 989424940</h3>
                        </a><br />
                        <a href='https://www.instagram.com/direto__do__closet/'>
                            <img width='25' height='25' src={insta} alt="insta" /> <h3>@direto__do__closet</h3>
                        </a><br /><br />
                        <p>Horário de atendimento: De segunda a sábado das 10h ás 19h</p>
                    </div>
                }
            </NavResponsive>
        </>
    )
}
