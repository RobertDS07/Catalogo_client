import React from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { createGlobalStyle } from 'styled-components'

import Routes from './routes'

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
    }
    .logo{
      position: absolute;
      left: calc((100% - 65px)/2);
    }
    #root.responsive{
      width: auto;
      height: auto;
      display: grid;
      grid-template-rows: 75px 1fr;
      grid-template-columns: 0.3fr 270px 1fr 0.3fr;
      grid-template-areas: 
      "cabeçalho cabeçalho cabeçalho cabeçalho"
      "nothing nav main morenothing";
    }
`

window.addEventListener('load', () => {
  window.innerWidth >= 1400 ? document.querySelector('#root').classList.add('responsive') : document.querySelector('#root').classList.remove('responsive')
})
window.addEventListener('resize', () => {
  window.innerWidth >= 1400 ? document.querySelector('#root').classList.add('responsive') : document.querySelector('#root').classList.remove('responsive')
})

function App() {
  return (
    <Router>
      <GlobalStyles />

      <Routes />

    </Router>
  );
}
export default App;