import React from 'react'
import styled from 'styled-components'

const Main = styled.main`
    width: 100vw;
    height: 100vh;
    background-color: #F1F7FA;
    display: grid;
    grid-template-areas: 
    "left right";
    font-family: 'Inter', sans-serif;
    @media (max-width: 759px){
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

export const WrapperImg = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: ${props => props.padding};
        @media (min-width: 1200px ) and (max-width: 1600px) { 
            padding: 0;
            & img {
                width: 700px;
            }
        }
        @media (min-width: 760px) and (max-width: 1199px){
            padding: 0;
            & img {
                width: 400px;
            }
        }
        @media (max-width: 759px){
            display: none;
    }
`

export const WrapperText = styled.div`
        grid-area: ${props => props.area};
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.4rem;
        color: #072540;
        padding-left: 40px;
        flex-direction: column;
    & a {
        left: -90px;
        position: relative;
    }
    & h1{
        color: #3F3D56;
    }
    & span {
        color:#6C63FF;
    }
    @media (min-width: 760px) and (max-width: 1199px) {
        padding-left: 30px;
        font-size: 0.9rem;
    }
    @media (max-width: 759px){
        font-size: 1rem;
    }
`

export default props => {
    return (
        <Main>
            {props.children}
        </Main>
    )
}