import React from 'react'
import styled from 'styled-components'
import loading from '../assets/loading.svg'

const Loading = styled.div`
    position: absolute;
    top: 100px;
    left: 0;
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
`

export default () => 
    <Loading>
        <img src={loading} alt='loading' />
    </Loading>