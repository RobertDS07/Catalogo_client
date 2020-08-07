import React from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { createGlobalStyle } from 'styled-components'
import axios from 'axios'

import Routes from './routes'
import Nav from './components/Nav'
import A from './components/A'
import ScrollNav from './components/ScollNav'
import Modal from './components/adminComponents/Modal'

import whats from './assets/whats.png'
import logo from './assets/logo.png'

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
    .logo{
      position: absolute;
      left: calc((100% - 65px)/2);
    }
`

function App() {
  //Pegando todos os tipo disponiveis de roupas no DB
  const [tipo, setTipo] = React.useState()

  React.useEffect(() => {
    const dados = async () => await axios.get('http://localhost:8081/tipos')
    dados().then(res => setTipo(res.data))
  }, [])

  return (
    <Router>
      <GlobalStyles />

      <A link='https://www.instagram.com/direto__do__closet/' txt='@direto_do_closet' />

      {window.localStorage.length === 0 &&
        <a className='whats' href='https://wa.me/5551989424940?text=Oii%20'>
          <img src={whats} width='70' height='70' />
        </a>
      }

      {window.localStorage.length !== 0 &&
        <Modal />
      }

      <img className='logo' src={logo} />

      <Nav>
        {window.localStorage.length == 0 &&
          <ScrollNav tipo={tipo} />
        }
        {window.localStorage.length != 0 &&
          <ScrollNav tipoAdmin={tipo} />
        }
      </Nav>

      <Routes />

    </Router>
  );
}
export default App;