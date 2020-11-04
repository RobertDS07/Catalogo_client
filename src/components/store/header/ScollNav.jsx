import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import debounce from '../../../utils/debounce'

import search from '../../../assets/search.png'

const ScrollNav = styled.div`
    width: auto;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    margin-top: auto;

    &::-webkit-scrollbar {
        display: none;
    }
    img {
        cursor: pointer;
        transform: rotateY(180deg);
        margin-bottom: 2px;
    }
    h3 {
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
        border-bottom: 2px solid transparent;
    }
    a:focus {
        border-bottom: 2px solid black;
        border-radius: 2px;
    }
    @media (min-width: 501px) {
        width: 100%;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        bottom: 0;
    }
    @media (min-width: 1400px) {
        position: relative;
        flex-direction: column;
    }
    input {
        border: none;
        outline: none;
        padding: 7px;
        font-size: 16px;
    }
`

export default (props) => {
    const [searchArea, setSearchArea] = useState(false)

    return (
        <ScrollNav>
            {searchArea && (
                <>
                    <h3
                        onClick={() => {
                            setSearchArea(false)
                            props.searchFunction(null)
                        }}
                    >
                        X
                    </h3>
                    <input
                        type="text"
                        placeholder="O que você procura?"
                        onChange={(e) =>
                            debounce(props.searchFunction, e.target.value, 1000)
                        }
                    />
                </>
            )}

            {!searchArea && (
                <>
                    <img
                        src={search}
                        alt="Search"
                        width="16"
                        height="16"
                        onClick={() => setSearchArea(true)}
                    />
                    <Link
                        to={`/${props.storeName}`}
                        onClick={() => {
                            document.querySelector(
                                '.sort'
                            ).children[0].innerHTML = 'Tudo'
                            props.setThisCategory(false)
                        }}
                    >
                        Tudo
                    </Link>
                    {!!props.tipo &&
                        props.tipo.map((e) => (
                            <Link
                                key={`/${props.storeName}/category/${e.category}`}
                                style={{ textTransform: 'capitalize' }}
                                onClick={() => {
                                    document.querySelector(
                                        '.sort'
                                    ).children[0].innerHTML = e.category
                                    props.setThisCategory(e.category)
                                }}
                                to={`/${props.storeName}/category/${e.category}`}
                            >
                                {e.category}
                            </Link>
                        ))}
                </>
            )}
        </ScrollNav>
    )
}
