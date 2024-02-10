// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import Admin from './Admin';
import Home from './Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

function App() {
  // const [count, setCount] = useState(0)
  // <a className="navbar-brand text-center" href="#">BarLiv</a>

  return (
    <Auth0Provider
      domain="{yourDomain}"
      clientId="{yourClientId}"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >

      <div className='d-flex flex-column' style={{ minHeight: '100vh' }}>
        <div className='flex-grow-1' >
          <BrowserRouter>
            <nav className="navbar navbar-dark p-2" style={{ backgroundColor: '#F99C2F' }}>
              <Link className="navbar-brand text-center" to="/home">BarLivet</Link>
              <Link className="navbar-brand text-center" to="/admin">Hantera event</Link>
            </nav>

            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </BrowserRouter>
        </div>
        <footer className="py-3" style={{ backgroundColor: '#F99C2F' }}>
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Home</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Features</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Pricing</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">FAQs</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">About</a></li>
          </ul>
          <p className="text-center text-muted">© 2022 Company, Inc</p>
        </footer>
      </div>

      {/* </div> */}
    </Auth0Provider>
  )
}

export default App
