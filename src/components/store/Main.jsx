import React from 'react'
import styled from 'styled-components'

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

export default ({storeName}) => {

    return (
        <Store>
            <h1>{storeName}</h1>
        </Store>
    )
}