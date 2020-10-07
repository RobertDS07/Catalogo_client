import React from 'react';
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'

import Routes from './routes'

import search from '../src/assets/search.png'

const GlobalStyles = createGlobalStyle`
    *{
      padding: 0;
      margin: 0;
      overflow-x: hidden;
      scroll-behavior: smooth;
    }
    body{
      font-family: 'Mulish', sans-serif;
    }
    input{
      outline: none;
    }
    #root{
      position: relative;

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
      <Router>
        <Routes />
      </Router>
    </>
  );
}
export default App;