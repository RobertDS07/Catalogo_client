import React, { useState } from 'react'
import styled from 'styled-components'

const Modal = styled.div`
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
        form{
            display: flex;
            flex-direction: column;
        }
        label{
            color: white;
        }
`

const Circle = styled.div`
        position:fixed;
        bottom: 10px;
        right: 10px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #00FFFF;
        font-size: 27px;
        font-weight: bold;
        text-align: center;
        cursor: pointer;
        &.logoff{
            font-size: 10px;
            bottom: 55px;
        }
`

export default props => {
    const [visible, setVisible] = useState(false)

    return (
        <>
            <Circle onClick={() => setVisible(true)}>+</Circle>
            <Circle className='logoff' onClick={() => {window.localStorage.removeItem('authorization'); props.setLogged(false)}}>Sair</Circle>
            {visible &&
                <Modal id='modal' onClick={e => e.target.id === 'modal' && setVisible(false) }>
                    <form action='https://catalogo-server.herokuapp.com/admin/add' method="post">
                        <label htmlFor="fotourl">URL da foto:</label>
                        <input type="text" name="fotourl" id="fotourl" placeholder='EX: http://.../.png .jpg ...' />
                        <label htmlFor="nome">Nome:</label>
                        <input type="text" name="nome" id="nome" />
                        <label htmlFor="preço">Preço:</label>
                        <input type="text" name="preço" id="preço" placeholder='EX: 40.00 (sem R$ e ,)' />
                        <label htmlFor="tamanho">Tamanho:</label>
                        <input type="text" name="tamanho" id="tamanho" />
                        <label htmlFor="descriçao">Descrição do produto:</label>
                        <input type="text" name="descriçao" id="descriçao" />
                        <label htmlFor="tipo">Tipo:</label>
                        <input type="text" name="tipo" id="tipo" /><br />
                        <input type="hidden" name="token" value={window.localStorage.getItem('authorization')} />
                        <button type="submit">Cadastrar produto</button>
                    </form>
                </Modal>
            }
        </>
    )
}