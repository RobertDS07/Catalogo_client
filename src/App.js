import React from 'react';
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";
import { createGlobalStyle } from 'styled-components'
import axios from 'axios'

import Routes from './routes'
import Nav from './components/Nav'
import A from './components/A'
import ScrollNav from './components/ScollNav'

import logo from './assets/logo.png'
import whats from './assets/whats.png'

const GlobalStyles = createGlobalStyle`
    *{
      padding: 0;
      margin: 0;
      overflow-x: hidden;
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
`

function App() {

  const [tipo, setTipo] = React.useState()

  React.useEffect(() => {
    const dados = async () => await axios.get('http://localhost:8081/tipos')
    dados().then(res => setTipo(res.data))
  }, [])

  return (
    <Router>
      <GlobalStyles />

      <a className='whats' href='https://wa.me/5551989424940?text=Oii%20'><img src={whats} width='70' height='70'></img></a>
      <A link='https://www.instagram.com/direto__do__closet/' txt='@direto_do_closet' />
      <Nav>
        <img src={logo}></img>
        <ScrollNav>
          <Link to='/'>Tudo</Link>
          {!tipo && <h3>Loading...</h3>}
          {!!tipo && tipo.map(e => <Link key={e} to={e}>{e}</Link>)}
        </ScrollNav>
      </Nav>
      <Routes />
    </Router>
  );
}
export default App;