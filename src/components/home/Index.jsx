import React from 'react'
import styled from 'styled-components'

import Main from './main/Index'

const WrapperHome = styled.div`
    width: auto;
    height: auto;
`

export default () => {
    return(
        <WrapperHome>
            <Main />
        </WrapperHome>
    )
}