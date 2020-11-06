import React from 'react'
import styled from 'styled-components'

const Modal = styled.div`
    width: 100vw;
    height: 100vh;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    left: 0;
    top: 0;
    justify-content: center;
    align-items: center;
    display: flex;
`

export default ({ setModal, children }) => {
    return (
        <Modal
            id="Modal"
            onClick={(e) => e.target.id === 'Modal' && setModal(false)}
        >
            {children}
        </Modal>
    )
}
