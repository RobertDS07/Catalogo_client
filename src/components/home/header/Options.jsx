import Axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import menu from '../../../assets/menu.svg'
import Modal from '../modal/Index'
import WrapperMenu from './WrapperMenu'

const Options = styled.div`
        display: flex;
        justify-content: center;
        align-items: flex-end;
        z-index: 1;
    & .dropDown {
        margin: 0 0 5px 50px;
        color: #54526b;
        position: relative;
        overflow: visible;
        height: 20px;
    }
    & .dropDown p {
        cursor: pointer;
    }

    & .anyStore {
        min-width: 100px;
        min-height: 150px;
        background-color: white;
        box-shadow: 0 0 9px grey;
        position: absolute;
        bottom: -160px;
        visibility: hidden;
        opacity: 0;
        transition: .4s;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    & a{
        text-decoration: none;
        color: #54526b;
    }

    & .anyStore hr {
        width: 80%;
    }

    & .anyStore p {
        padding: 5px;
    }

    & .dropDown:hover .anyStore{
        visibility: visible;
        opacity: 1;
    }
    
    & .anyStore:hover{
        visibility: visible;
        opacity: 1;
    }
    
    & img {
        cursor: pointer;
        width: 72px;
        position: fixed;
        right: 20px;
        top: 20px;
        }
`

export default () => {
    const [mobile, setMobile] = useState(window.innerWidth < 760 ? true : false)
    const [modal, setModal] = useState(false)
    const [stores, setStores] = useState()
    const [options, setOptions] = useState()
    
    const newMenu = {
        'lojas': () =>
            <WrapperMenu>
                <button className='closeModal' onClick={() => setModal(false)}>X</button>
                {!!stores && stores.map((e, index) => {
                    if (stores.length - 1 === index) return <Link to={e.storeNameToLink}><p>{e.storeNameToLink}</p></Link>

                    return (
                        <>
                            <Link to={e.storeNameToLink}><p>{e.storeNameToLink}</p></Link>
                            <hr />
                        </>
                    )
                })}
            </WrapperMenu>
    }

    useEffect(() => {
        if (!stores) (async () => {
            const res = await Axios.post(process.env.REACT_APP_API || 'http://localhost:8081/graphql', {
                query: `
                {
                    storeNamesToLink {
                        storeNameToLink
                    }
                }
                `
            })

            setStores(res.data.data.storeNamesToLink)
        })()
    })

    window.addEventListener('resize', () => window.innerWidth < 760 ? setMobile(true) : setMobile(false))
    return (
        <>
            <Options>
                {!mobile &&
                    <div className="dropDown">
                        <p>Algumas lojas <small>▼</small></p>

                        <div className="anyStore">
                            {!!stores && stores.map((e, index) => {
                                if (stores.length - 1 === index) return <Link to={e.storeNameToLink}><p>{e.storeNameToLink}</p></Link>

                                return (
                                    <>
                                        <Link to={e.storeNameToLink}><p>{e.storeNameToLink}</p></Link>
                                        <hr />
                                    </>
                                )
                            })}
                        </div>
                    </div>
                }


                {!modal && !!options && setOptions()}
                {modal && <Modal setModal={setModal} />}
                {mobile &&
                    <>
                        <img className='menu' src={menu} alt="Menu" onClick={() => setModal(true)} />

                        {modal &&
                            <>
                                <WrapperMenu>
                                    <button className='closeModal' onClick={() => setModal(false)}>X</button>
                                    <div className="wrapperMenuItens">
                                        <p onClick={() => setOptions('lojas')}>Algumas lojas</p>
                                    </div>
                                </WrapperMenu>
                                {!!options && newMenu[options]()}
                            </>
                        }
                    </>
                }
            </Options>
        </>
    )
}