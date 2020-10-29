import React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import A from './header/A'


import Axios from 'axios'
import showErrorMsg from '../../utils/showErrorMsg'

import whats from '../../assets/whats.png'
import arrowUp from '../../assets/arrowUp.png'
import { Link, Redirect, Route } from 'react-router-dom'
import NotFound404 from '../utils/NotFound404'

import WrapperMain from './products/Wrapper'


const Store = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

@media (min-width: 1400px) {
  width: auto;
  min-height: 100vh;
  position: relative;
  display: grid;
  grid-template-rows: 75px 1fr 20px;
  grid-template-columns: 0.3fr 270px 1fr 0.3fr;
  grid-template-areas: 
  "cabeçalho cabeçalho cabeçalho cabeçalho"
  "nothing nav main morenothing"
  "footer footer footer footer ";
}
`

export default ({ storeName }) => {
    const [storeInfo, setStoreInfo] = useState(undefined)
    const [admin, setAdmin] = useState()
    const [responsive, setResponsive] = useState(window.innerWidth < 1400 ? false : true)

    useEffect(() => {
        if (!storeInfo) {
            (async () => {
                try {
                    const res = await Axios.post(process.env.REACT_APP_API || 'http://localhost:8081/graphql', {
                        query: `
                    {
                        storeInfo(storeName:"${storeName}"){
                            storeNameToLink
                            logoLink
                            instaLink
                            insta
                            whats
                            whatsLinkToMsg
                        }
                    }
                    `
                    })
                    setStoreInfo({ ...res.data.data.storeInfo })
                } catch (e) {
                    setStoreInfo(false)
                    if (!!e.response) return showErrorMsg(e.response.data.errors[0].message)
                }
            })()
        }
        if (!!localStorage.getItem('authorization')) {
            (async () => {
                const res = await Axios.post(process.env.REACT_APP_API || 'http://localhost:8081/graphql', {
                    query: `
                    {
                        verifyToken(token:"${localStorage.getItem('authorization')}" storeName:"${storeName}") {
                            admin
                        }
                    }
                    `
                })
                if (!res.data.data.verifyToken) return setAdmin(false)

                const admin = res.data.data.verifyToken.admin

                if (!admin) return setAdmin(false)

                return setAdmin(true)
            })()
        }
    }, [])

    window.addEventListener('resize', () => window.innerWidth < 1400 ? setResponsive(false) : setResponsive(true))

    return (
        <Store>
            {!storeInfo && storeInfo !== undefined && <NotFound404 />}
            {!!storeInfo &&
                <>
                    <A link={storeInfo.instaLink} txt={storeInfo.insta} />

                    {!admin && window.innerWidth < 1400 &&
                        <a className='whats' href={storeInfo.whatsLinkToMsg}>
                            <img src={whats} alt={storeInfo.whats} width='70' height='70' />
                        </a>
                    }
                    {window.innerWidth > 1400 &&
                        <img className='arrowUp' src={arrowUp} alt='Ir para o topo' width='50' height='50' onClick={() => window.scrollTo(0, 0)} />
                    }

                    <Link to={`/${storeName}`} style={{ zIndex: 2 }} className='logo'><img alt={storeInfo.insta} src={storeInfo.logoLink} /></Link>

                    <WrapperMain responsive={responsive} admin={admin} setAdmin={setAdmin} storeName={storeName} storeInfo={storeInfo} />

                    {responsive && <footer><a href='https://twitter.com/bugextreme1'>Desenvolvido por Robert Damaceno</a></footer>}
                </>
            }

        </Store>
    )
}