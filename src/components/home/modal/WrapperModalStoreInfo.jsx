import React from 'react'
import styled from 'styled-components'

import examplesStore from '../../../assets/exampleStore.png'

import Button from '../main/Button'

const WrapperModalStore = styled.div`
    display: grid;
    grid-template-areas:
    "img text";
    max-width: 900px;
    position: relative;
    background-color: #ffffff;
    -webkit-box-shadow: 0px 0px 9px 2px  rgba(0, 0, 0, 0.4);
    -moz-box-shadow: 0px 0px 9px 2px  rgba(0, 0, 0, 0.4);
    box-shadow: 0px 0px 9px 2px  rgba(0, 0, 0, 0.4);

    & .closeModal {
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
    
    & img {
        padding: 8px 0 8px 8px;
        grid-area: 'img';
    }

    & .wrapperText{
        grid-area: 'text';
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: 'Inter', sans-serif;
        padding: 0 60px 0 60px;
    }

    & .wrapperText h1{
        margin-bottom: 14px;
        font-size:2.1rem;
        font-weight: 600;
    }

    & .wrapperText p{
        font-weight: 300;
    }
    @media (min-width: 760px) and (max-width: 1199px) {
        width: 700px;
        & button {
            margin-bottom: 5px;
        }
    }
    @media (max-width: 759px){
        display: flex;
        justify-content: center;
        align-items: center;
        width: 400px;
        & img {
            display: none;
        }
        & button {
            margin-bottom: 5px;
        }
    }
`

export default ({ setModal }) =>
    <WrapperModalStore>
        <button className='closeModal' onClick={() => setModal(false)}>X</button>
        <img src={examplesStore} />
        <div className="wrapperText">
            <h1>Por que criamos a Easy Catalog?</h1>
            <p>A Easy Catalog foi criada para ajudar as lojas a crescerem, tendo em vista que mostrar seus produtos por meio de google drive ou uma hashtag ou qualquer outro método que criam para essa finalidade passa uma visão de amadorismo para seus cliente e também isso é super compreensível tendo em vista que um site por menor que seja não sai por menos de R$1000,00, tendo em mente isso, nós trouxemos essa ideia onde por menos de R$6 por mês você pode ter seu catálogo online, podendo cancelar sua assinatura a qualquer momento.</p>
            <a href='https://wa.link/umzspt'><Button>Eu quero!</Button></a>
        </div>
    </WrapperModalStore>