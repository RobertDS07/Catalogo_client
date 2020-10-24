import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'

import mainImg from '../../assets/mainImg.svg'
import mainImg2 from '../../assets/mainImg2.svg'

import Main, { WrapperText, WrapperImg } from './main/Index'
import Button from './main/Button'
import Header from './header/Index'
import Modal from './modal/Index'
import WrapperModalStoreInfo from './modal/WrapperModalStoreInfo'

const WrapperHome = styled.div`
    width: auto;
    height: auto;

    & a {
        z-index:0;
    }
`

export default () => {
    const [modal, setModal] = useState(false)
    return (
        <>
            {!!modal &&
                <Modal setModal={setModal}>
                    <WrapperModalStoreInfo setModal={setModal} />
                </Modal>
            }
            <WrapperHome>
                <Header />
                <Main>
                    <WrapperText area="left">
                        <h1>Torne seu negócio<span> mais profissional</span> por menos de <span>6 reais por mês.</span></h1>
                        <a href='https://wa.link/umzspt'><Button>Eu quero!</Button></a>
                    </WrapperText>

                    <WrapperImg padding='200px'>
                        <img src={mainImg}></img>
                    </WrapperImg>
                </Main>
                <Main>
                    <WrapperText area="right" >
                        <h1>Tenha <span>seu próprio catálogo online</span>, não use mais o google drive ou hashtags para mostrar o que você tem disponivel para seus clientes,<span> seja mais profissional.</span></h1>
                        <a onClick={() => setModal(true)}><Button>Saber sobre</Button></a>
                    </WrapperText>

                    <WrapperImg padding='0'>
                        <img src={mainImg2}></img>
                    </WrapperImg>
                </Main>
            </WrapperHome>
        </>
    )
}