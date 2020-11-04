import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'

import Routes from './routes'

import Msg from './components/utils/ErrorMsg'

import search from './assets/search.png'

const GlobalStyles = createGlobalStyle`
    *{
      padding: 0;
      margin: 0;
      scroll-behavior: smooth;
    }
    body{
      font-family: 'Mulish', sans-serif;
      overflow-x: hidden;
    }
    input{
      outline: none;
    }
    .whats{
      position: fixed;
      right: 0;
      bottom: 0;
      border-radius: 50%;
    }
    .arrowUp{
      position: fixed;
      right: 50px;
      bottom: 30px;
      border-radius: 50%;
      cursor: pointer;
    }
    .logo{
      position: absolute;
      left: calc((100% - 65px)/2);
    }
    .search{
      grid-column-start: 2;
      grid-row: 1;
      margin: 36px;
      width: 183px;
      height: 20px;
      border: none;
      background-image: url(${search});
      background-repeat: no-repeat;
      background-size: 18px;
      padding-left: 20px;
      outline: none;
    }
    footer{
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 20px;
      background-color: #E4E6E8;
      text-align: center;
      grid-area: footer;
    }
    footer a {
      text-decoration: none;
      color: grey;
    }
`

function App() {
    return (
        <>
            <GlobalStyles />

            <Msg />
            <Router>
                <Routes />
            </Router>
        </>
    )
}
export default App
