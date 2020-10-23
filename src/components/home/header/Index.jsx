import Axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../../../assets/logo.png'

const Header = styled.header`
    position: absolute;
    left: 2%;
    top: 2%;
    display: flex;
    flex-direction: row;
    font-family: 'Inter', sans-serif;

    & .dropDown {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        margin: 0 0 5px 50px;
        color: #54526b;
        position: relative;
        overflow: visible;
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
`

export default () => {
    const [stores, setStores] = useState()

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

    return (
        <Header>
            <Link to='/'><img src={logo} alt="logo" /></Link>
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
        </Header>
    )
}