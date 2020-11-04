import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import debounce from '../../../utils/debounce'

import whats from '../../../assets/whats.png'
import insta from '../../../assets/instagram.png'

const NavResponsive = styled.nav`
    width: 100%;
    min-height: 100px;
    grid-area: nav;
    #content {
        margin: 0 10px 10px 40px;
    }
    h3 {
        color: grey;
        font-size: 14px;
        cursor: pointer;
    }
    h3.margin {
        margin: 15px 0 0 25px;
        font-size: 15px;
    }
    h3.selected {
        color: #c8c200;
    }
    h1 {
        margin-top: 15px;
    }
    a {
        text-decoration: none;
    }
    hr {
        margin: 25px 0 25px 0;
    }
    .wrapperSocialMedia {
        display: grid;
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 1fr;
        grid-template-areas:
            'whats'
            'insta';
    }
    .whatsIcon {
        grid-area: whats;
        display: grid;
        grid-template-columns: 30px 1fr;
        grid-template-areas: 'icon number';
    }
    .whatsIcon img {
        grid-area: icon;
    }
    .whatsIcon h3 {
        padding-top: 6px;
        padding-left: 7px;
        grid-area: number;
    }
    .insta {
        display: grid;
        grid-template-columns: 30px 1fr;
        grid-template-areas: 'icon number';
        grid-area: insta;
    }
    .insta img {
        padding-left: 5px;
        padding-top: 5px;
        grid-area: icon;
    }
    .insta h3 {
        padding-top: 3px;
        padding-left: 7px;
        font-size: 1rem;
        grid-area: number;
    }
    p {
        font-weight: 600;
        font-size: 12px;
    }
`

export default (props) => {
    const clearSelected = () => {
        let categorias = document.querySelector('#categorias')
        categorias = Array.from(categorias.children)
        categorias.forEach((element) => {
            element.children[0].classList.remove('selected')
        })
    }
    const clearSelectedOrdenar = () => {
        let ordenar = document.querySelector('#ordenar')
        ordenar = Array.from(ordenar.children)
        ordenar.forEach((element) => {
            element.classList.remove('selected')
        })
    }

    return (
        <>
            <input
                className="search"
                type="text"
                placeholder="O que você procura?"
                onChange={(e) =>
                    debounce(props.searchFunction, e.target.value, 1000)
                }
            />
            <NavResponsive>
                {!!props.tipo && (
                    <div id="content">
                        <h1>Categorias</h1>
                        <div id="categorias">
                            <Link to={`/${props.storeName}`}>
                                <h3
                                    onClick={(e) => {
                                        clearSelected()
                                        e.target.classList.add('selected')
                                        props.setThisCategory(false)
                                    }}
                                    className="margin selected"
                                >
                                    Tudo
                                </h3>
                            </Link>
                            {!!props.tipo &&
                                props.tipo.map((tipo) => (
                                    <Link
                                        key={tipo.category}
                                        to={`/${props.storeName}/category/${tipo.category}`}
                                        onClick={() =>
                                            props.setThisCategory(tipo.category)
                                        }
                                    >
                                        <h3
                                            onClick={(e) => {
                                                clearSelected()
                                                e.target.classList.add(
                                                    'selected'
                                                )
                                            }}
                                            className="margin"
                                            style={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            {tipo.category}
                                        </h3>
                                    </Link>
                                ))}
                        </div>
                        <h1>Ordenar por</h1>
                        <div id="ordenar">
                            <h3
                                className="margin selected"
                                onClick={(e) => {
                                    props.setSort(false)
                                    clearSelectedOrdenar()
                                    e.target.classList.add('selected')
                                }}
                            >
                                Lançamentos
                            </h3>
                            <h3
                                className="margin"
                                onClick={(e) => {
                                    props.setSort('asc')
                                    clearSelectedOrdenar()
                                    e.target.classList.add('selected')
                                }}
                            >
                                Menor preço
                            </h3>
                            <h3
                                className="margin"
                                onClick={(e) => {
                                    props.setSort('desc')
                                    clearSelectedOrdenar()
                                    e.target.classList.add('selected')
                                }}
                            >
                                Maior preço
                            </h3>
                        </div>
                        <hr />
                        <div className="wrapperSocialMedia">
                            <a className="whatsIcon" href={props.whatsLink}>
                                <img
                                    width="30"
                                    height="30"
                                    src={whats}
                                    alt={props.whats}
                                />
                                <h3>
                                    +55
                                    {props.whats}
                                </h3>
                            </a>
                            <a className="insta" href={props.instaLink}>
                                <img
                                    width="20"
                                    height="20"
                                    src={insta}
                                    alt={props.insta}
                                />
                                <h3>{props.insta}</h3>
                            </a>
                        </div>
                        <br />

                        <br />
                        <p>
                            Horário de atendimento: De segunda a sábado das 10h
                            ás 19h
                        </p>
                    </div>
                )}
            </NavResponsive>
        </>
    )
}
