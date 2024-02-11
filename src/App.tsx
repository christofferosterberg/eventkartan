// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import Admin from './components/Company';
import Home from './components/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import SignUp from './components/SignUp';
import React from 'react';

function App() {
  // const domain = process.env.REACT_APP_AUTH0_DOMAIN
  // const [count, setCount] = useState(0)
  // <a className="navbar-brand text-center" href="#">BarLiv</a>

  return (
    <Auth0Provider
      domain="dev-ni7jkmfx0oybqzdf.us.auth0.com"
      clientId="N2lQXrnVixNM6vCY5EHNNwCkUrq4j9jo"
      authorizationParams={{
        redirect_uri: window.location.origin + '/admin'
      }}
    >

      <div className='d-flex flex-column' style={{ minHeight: '100vh' }}>
        <div className='flex-grow-1' >
          <BrowserRouter>
            <nav className="navbar navbar-dark p-2" style={{ backgroundColor: '#F99C2F' }}>
              <Link className="navbar-brand text-center" to="/home">BarLivet</Link>
              <Link className="navbar-brand text-center" to="/admin">För företag</Link>
            </nav>

            <Routes>
            <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/registrera" element={<SignUp />} />
            </Routes>
          </BrowserRouter>
        </div>
        <footer className="py-3 mt-4" style={{ backgroundColor: '#F99C2F' }}>
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Hem</a></li>
            {/* <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Features</a></li> */}
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Priser</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">FAQs</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Om oss</a></li>
          </ul>
          <p className="text-center text-muted">© 2024 Barlivet AB</p>
        </footer>
      </div>

      {/* </div> */}
    </Auth0Provider>
  )
}

export default App
