import React from 'react'
import styled from 'styled-components'

const WrapperMenu = styled.div`
        position: fixed;
        width: 200px;
        height: 100%;
        top: 0;
        right: -200px;
        transition: 0.5s;
        background-color: #F1F7FA;
        z-index: 11;
        display: flex;
        align-items: center;
        flex-direction: column;
    &.show {
    right: 0;
    }
    .closeModal {
    position: absolute;
    background: none;
    border: none;
    top: 0;
    right: 0;
    font-size: 1.6rem;
    cursor: pointer;
    padding: 5px 10px;
    outline: none;
    }

    .closeModal.arrow {
        left: 0;
        right: unset;
    }

    .wrapperMenuItens {
        color: #54526b;
        min-width: 60%;
        margin: 0;
        margin-top: 20%;
        text-align: center;
        display: inline;
        word-break: keep-all;
    }

    .wrapperMenuItens hr {
        margin: 4px 0 4px;
    }
`

export default ({ children }) => {
    setTimeout(() => {
        Array.from(document.querySelectorAll('.wrapperMenu')).forEach((e, index) => {
            if (e.classList.contains('show')) return false

            e.classList.add('show')
        })
    }, 20)
    return (
        <WrapperMenu className='wrapperMenu'>
            {children}
        </WrapperMenu>
    )
}