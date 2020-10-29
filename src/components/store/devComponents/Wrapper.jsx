import Axios from 'axios'
import React from 'react'
import styled from 'styled-components'
import { CatchInputsData } from '../../../utils/catchInputsData'

import DevInput from './DevInput'

const Wrapper = styled.main`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default ({ storeNameToLink }) => {
    const createStore = async (e) => {
        e.preventDefault()
        const button = e.target.lastChild
        button.disabled = true

        const {auth, logoLink, instaLink, insta, whats, whatsLinkToMsg, storeNameToLink} = CatchInputsData(e)

        const res = await Axios.post(process.env.REACT_APP_API || 'http://localhost:8081/graphql', {
            query:`
            mutation{
                createStore(data:{storeNameToLink: "${storeNameToLink}" logoLink: "${logoLink}" instaLink: "${instaLink}" insta:"${insta}" whats:"${whats}" whatsLinkToMsg:"${whatsLinkToMsg}"} auth:"${auth}")
            }
            `
        })

        if (!!res.data.data.createStore) return true

        button.disabled = false
    }

    const createAdmin = async (e) => {
        e.preventDefault()
        const button = e.target.lastChild
        button.disabled = true

        const {auth, email, password, storeNameToLink, name} = CatchInputsData(e)

        const res = await Axios.post(process.env.REACT_APP_API || 'http://localhost:8081/graphql', {
            query:`
            mutation{
                createAdmin(data:{storeName: "${storeNameToLink}" password: "${password}" email: "${email}" name:"${name}"} auth:"${auth}")
            }
            `
        })

        if (!!res.data.data.createStore) return true

        button.disabled = false
    }

    return (
        <Wrapper>
            <DevInput storeName={storeNameToLink} createFunction={createStore} inputs={['logoLink', 'instaLink', 'insta', 'whats', 'whatsLinkToMsg']}/>
            <DevInput storeName={storeNameToLink} createFunction={createAdmin} inputs={['name', 'email', 'password']}/>
        </Wrapper>
    )
}